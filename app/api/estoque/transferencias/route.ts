import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Transfere quantidade de um produto entre duas lojas distintas, operando sobre a tabela estoque_loja
 * e registrando histórico na tabela entrada_estoque (saída na origem e entrada no destino).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { produto_id, quantidade, loja_origem, loja_destino } = body || {};

    if (!produto_id || !quantidade || !loja_origem || !loja_destino) {
      return Response.json(
        { message: 'Campos obrigatórios: produto_id, quantidade, loja_origem, loja_destino' },
        { status: 400 }
      );
    }

    const produtoId = parseInt(produto_id.toString());
    const qtd = parseInt(quantidade.toString());
    const origemId = parseInt(loja_origem.toString());
    const destinoId = parseInt(loja_destino.toString());

    if ([produtoId, qtd, origemId, destinoId].some(v => isNaN(v)) || qtd <= 0) {
      return Response.json(
        { message: 'Dados inválidos: IDs numéricos e quantidade > 0' },
        { status: 400 }
      );
    }
    if (origemId === destinoId) {
      return Response.json(
        { message: 'loja_origem e loja_destino devem ser diferentes' },
        { status: 400 }
      );
    }

    // Verifica produto e lojas
    const [produto, lojaOrigem, lojaDestino] = await Promise.all([
      prisma.produtos.findUnique({ where: { id: produtoId } }),
      prisma.lojas.findUnique({ where: { id: origemId } }),
      prisma.lojas.findUnique({ where: { id: destinoId } }),
    ]);

    if (!produto) {
      return Response.json({ message: 'Produto não encontrado' }, { status: 404 });
    }
    if (!lojaOrigem) {
      return Response.json({ message: 'Loja de origem não encontrada' }, { status: 404 });
    }
    if (!lojaDestino) {
      return Response.json({ message: 'Loja de destino não encontrada' }, { status: 404 });
    }

    // Busca saldos por loja - se não existir, cria com estoque do produto
    let saldoOrigem = await prisma.estoque_loja.findUnique({
      where: { produto_id_loja_id: { produto_id: produtoId, loja_id: origemId } as any },
    } as any);

    // Se não existe estoque na loja de origem, cria com o estoque atual do produto
    if (!saldoOrigem) {
      const estoqueProduto = produto.quantidade_estoque || 0;
      if (estoqueProduto < qtd) {
        return Response.json(
          { message: `Estoque insuficiente. Disponível: ${estoqueProduto}, Solicitado: ${qtd}` },
          { status: 400 }
        );
      }
      // Cria estoque na loja de origem com o estoque do produto
      saldoOrigem = await prisma.estoque_loja.create({
        data: {
          produto_id: produtoId,
          loja_id: origemId,
          quantidade_estoque: estoqueProduto,
          quantidade_disponivel: estoqueProduto,
          quantidade_mostruario: 0,
        },
      });
    }

    const estoqueOrigem = saldoOrigem.quantidade_estoque;
    const disponivelOrigem = saldoOrigem.quantidade_disponivel;

    if (estoqueOrigem < qtd || disponivelOrigem < qtd) {
      return Response.json(
        { message: `Saldo insuficiente na loja de origem. Estoque: ${estoqueOrigem}, Disponível: ${disponivelOrigem}, Solicitado: ${qtd}` },
        { status: 400 }
      );
    }

    // Transação para garantir consistência
    const resultado = await prisma.$transaction(async (tx) => {
      // 1) Atualiza estoque_loja origem (decrementa)
      await tx.estoque_loja.update({
        where: { produto_id_loja_id: { produto_id: produtoId, loja_id: origemId } as any },
        data: {
          quantidade_estoque: { decrement: qtd },
          quantidade_disponivel: { decrement: qtd },
        },
      } as any);

      // 2) Atualiza/Insera estoque_loja destino (incrementa)
      const destinoAtualizado = await tx.estoque_loja.upsert({
        where: { produto_id_loja_id: { produto_id: produtoId, loja_id: destinoId } as any },
        update: {
          quantidade_estoque: { increment: qtd },
          quantidade_disponivel: { increment: qtd },
        },
        create: {
          produto_id: produtoId,
          loja_id: destinoId,
          quantidade_estoque: qtd,
          quantidade_disponivel: qtd,
          quantidade_mostruario: 0,
        },
      } as any);

      // 3) Registra histórico na entrada_estoque (saída na origem, entrada no destino), tipo 3 = transferência
      await tx.entrada_estoque.create({
        data: {
          produto_id: produtoId,
          quantidade: -qtd,
          data_entrada: new Date(),
          tipo_entrada: 3,
          loja_id: origemId,
        },
      });
      await tx.entrada_estoque.create({
        data: {
          produto_id: produtoId,
          quantidade: qtd,
          data_entrada: new Date(),
          tipo_entrada: 3,
          loja_id: destinoId,
        },
      });

      // 4) Atualiza visão agregada em produtos (opcional: manter como soma de todas as lojas)
      // Recalcula somatórios por produto
      const agregados = await tx.estoque_loja.groupBy({
        by: ['produto_id'],
        where: { produto_id: produtoId },
        _sum: {
          quantidade_estoque: true,
          quantidade_mostruario: true,
          quantidade_disponivel: true,
        },
      });
      const sums = agregados[0]?._sum || { quantidade_estoque: 0, quantidade_mostruario: 0, quantidade_disponivel: 0 };

      const produtoAtualizado = await tx.produtos.update({
        where: { id: produtoId },
        data: {
          quantidade_estoque: sums.quantidade_estoque ?? 0,
          quantidade_mostruario: sums.quantidade_mostruario ?? 0,
          quantidade_disponivel: sums.quantidade_disponivel ?? 0,
        },
      });

      return { produto_atualizado: produtoAtualizado, destino_atualizado: destinoAtualizado };
    });

    return Response.json(resultado, { status: 200 });
  } catch (error) {
    console.error('Erro ao transferir estoque entre lojas:', error);
    return Response.json(
      { message: 'Erro interno do servidor ao processar transferência entre lojas.' },
      { status: 500 }
    );
  }
}


