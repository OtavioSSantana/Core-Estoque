// app/api/estoque/saidas/route.ts

import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Função para lidar com requisições POST (registrar saída de estoque)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tipo = body.tipo;

    if (tipo === 'transferencia') {
      const { produto_id, quantidade, tipo_transferencia, loja_id } = body || {};
      if (!produto_id || !quantidade || !tipo_transferencia) {
        return Response.json(
          { message: 'Campos obrigatórios: produto_id, quantidade, tipo_transferencia' },
          { status: 400 }
        );
      }

      const produtoId = parseInt(produto_id.toString());
      const quantidadeTransferencia = parseInt(quantidade.toString());
      if (isNaN(produtoId) || isNaN(quantidadeTransferencia) || quantidadeTransferencia <= 0) {
        return Response.json(
          { message: 'Dados inválidos: IDs numéricos e quantidade > 0' },
          { status: 400 }
        );
      }

      const produtoExistente = await prisma.produtos.findUnique({ where: { id: produtoId } });
      if (!produtoExistente) {
        return Response.json({ message: 'Produto não encontrado' }, { status: 404 });
      }

      const estoqueAtual = produtoExistente.quantidade_estoque || 0;
      const mostruarioAtual = produtoExistente.quantidade_mostruario || 0;

      let updateData: {
        quantidade_mostruario?: { decrement: number };
        quantidade_estoque?: { increment: number };
      } = {};
      if (tipo_transferencia === 'mostruario_para_estoque') {
        if (mostruarioAtual < quantidadeTransferencia) {
          return Response.json(
            { message: `Mostruário insuficiente. Disponível: ${mostruarioAtual}, Solicitado: ${quantidadeTransferencia}` },
            { status: 400 }
          );
        }
        updateData = {
          quantidade_mostruario: { decrement: quantidadeTransferencia },
          quantidade_estoque: { increment: quantidadeTransferencia },
        };
      } else {
        if (estoqueAtual < quantidadeTransferencia) {
          return Response.json(
            { message: `Estoque insuficiente. Disponível: ${estoqueAtual}, Solicitado: ${quantidadeTransferencia}` },
            { status: 400 }
          );
        }
        updateData = {
          quantidade_estoque: { decrement: quantidadeTransferencia },
          quantidade_mostruario: { increment: quantidadeTransferencia },
        };
      }

      const produtoAtualizado = await prisma.produtos.update({
        where: { id: produtoId },
        data: updateData,
      });

      // Atualizar estoque_loja se loja_id fornecido
      if (loja_id) {
        const lojaParsed = parseInt(loja_id.toString());
        if (!isNaN(lojaParsed)) {
          if (tipo_transferencia === 'mostruario_para_estoque') {
            await prisma.estoque_loja.upsert({
              where: { produto_id_loja_id: { produto_id: produtoId, loja_id: lojaParsed } },
              update: {
                quantidade_mostruario: { decrement: quantidadeTransferencia },
                quantidade_estoque: { increment: quantidadeTransferencia },
              },
              create: {
                produto_id: produtoId,
                loja_id: lojaParsed,
                quantidade_mostruario: 0,
                quantidade_estoque: quantidadeTransferencia,
                quantidade_disponivel: quantidadeTransferencia,
              },
            });
          } else {
            await prisma.estoque_loja.upsert({
              where: { produto_id_loja_id: { produto_id: produtoId, loja_id: lojaParsed } },
              update: {
                quantidade_estoque: { decrement: quantidadeTransferencia },
                quantidade_mostruario: { increment: quantidadeTransferencia },
                quantidade_disponivel: { decrement: quantidadeTransferencia },
              },
              create: {
                produto_id: produtoId,
                loja_id: lojaParsed,
                quantidade_mostruario: quantidadeTransferencia,
                quantidade_estoque: 0,
                quantidade_disponivel: 0,
              },
            });
          }
        }
      }

      return Response.json(produtoAtualizado, { status: 200 });
    }

    // Default: registrar saída de estoque
    const { produto_id, quantidade, motivo, tipo_saida, observacoes, loja_id } = body || {};
    if (!produto_id || !quantidade) {
      return Response.json(
        { message: 'Campos obrigatórios: produto_id, quantidade' },
        { status: 400 }
      );
    }

    const produtoId = parseInt(produto_id.toString());
    const quantidadeSaida = parseInt(quantidade.toString());
    if (isNaN(produtoId) || isNaN(quantidadeSaida) || quantidadeSaida <= 0) {
      return Response.json(
        { message: 'Dados inválidos: IDs numéricos e quantidade > 0' },
        { status: 400 }
      );
    }

    const produtoExistente = await prisma.produtos.findUnique({ where: { id: produtoId } });
    if (!produtoExistente) {
      return Response.json({ message: 'Produto não encontrado' }, { status: 404 });
    }

    const estoqueAtual = produtoExistente.quantidade_estoque || 0;
    const disponivelAtual = produtoExistente.quantidade_disponivel || 0;
    if (estoqueAtual < quantidadeSaida) {
      return Response.json(
        { message: `Estoque insuficiente. Disponível: ${estoqueAtual}, Solicitado: ${quantidadeSaida}` },
        { status: 400 }
      );
    }
    if (disponivelAtual < quantidadeSaida) {
      return Response.json(
        { message: `Quantidade disponível insuficiente. Disponível: ${disponivelAtual}, Solicitado: ${quantidadeSaida}` },
        { status: 400 }
      );
    }

    const produtoAtualizado = await prisma.produtos.update({
      where: { id: produtoId },
      data: {
        quantidade_estoque: { decrement: quantidadeSaida },
        quantidade_disponivel: { decrement: quantidadeSaida },
      },
    });

    const saidaRegistrada = await prisma.entrada_estoque.create({
      data: {
        produto_id: produtoId,
        quantidade: -quantidadeSaida,
        data_entrada: new Date(),
        tipo_entrada: 2,
        loja_id: loja_id ? parseInt(loja_id.toString()) : null,
      },
    });

    // Atualiza estoque_loja se loja_id for enviado
    if (loja_id) {
      const lojaParsed = parseInt(loja_id.toString());
      if (!isNaN(lojaParsed)) {
        await prisma.estoque_loja.upsert({
          where: { produto_id_loja_id: { produto_id: produtoId, loja_id: lojaParsed } },
          update: {
            quantidade_estoque: { decrement: quantidadeSaida },
            quantidade_disponivel: { decrement: quantidadeSaida },
          },
          create: {
            produto_id: produtoId,
            loja_id: lojaParsed,
            quantidade_estoque: 0,
            quantidade_mostruario: 0,
            quantidade_disponivel: 0,
          },
        });
      }
    }

    return Response.json(
      {
        saida_registrada: saidaRegistrada,
        produto_atualizado: {
          id: produtoAtualizado.id,
          codigo: produtoAtualizado.codigo,
          descricao: produtoAtualizado.descricao,
          quantidade_estoque: produtoAtualizado.quantidade_estoque,
          quantidade_disponivel: produtoAtualizado.quantidade_disponivel,
        },
        motivo: motivo || 'Saída de estoque',
        tipo_saida: tipo_saida || 'Venda',
        observacoes: observacoes || '',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao processar requisição POST de saída:", error);
    return Response.json(
      { message: "Erro interno do servidor ao processar requisição." },
      { status: 500 }
    );
  }
}
