// app/api/estoque/ajustes/route.ts

import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Função para lidar com requisições POST (ajustes de estoque: entrada/saída)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { produto_id, quantidade_ajuste, tipo_ajuste, motivo } = body || {};

    if (!produto_id || !quantidade_ajuste || !tipo_ajuste) {
      return Response.json(
        { message: 'Campos obrigatórios: produto_id, quantidade_ajuste, tipo_ajuste' },
        { status: 400 }
      );
    }

    const produtoId = parseInt(produto_id.toString());
    const quantidade = parseInt(quantidade_ajuste.toString());
    const isEntrada = tipo_ajuste === 'entrada';

    if (isNaN(produtoId) || isNaN(quantidade) || quantidade <= 0) {
      return Response.json(
        { message: 'Dados inválidos: IDs numéricos e quantidade > 0' },
        { status: 400 }
      );
    }

    const produto = await prisma.produtos.findUnique({ where: { id: produtoId } });
    if (!produto) {
      return Response.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    if (!isEntrada) {
      const estoqueAtual = produto.quantidade_estoque || 0;
      const disponivelAtual = produto.quantidade_disponivel || 0;
      if (estoqueAtual < quantidade) {
        return Response.json(
          { message: `Estoque insuficiente. Disponível: ${estoqueAtual}, Solicitado: ${quantidade}` },
          { status: 400 }
        );
      }
      if (disponivelAtual < quantidade) {
        return Response.json(
          { message: `Quantidade disponível insuficiente. Disponível: ${disponivelAtual}, Solicitado: ${quantidade}` },
          { status: 400 }
        );
      }
    }

    const produtoAtualizado = await prisma.produtos.update({
      where: { id: produtoId },
      data: {
        quantidade_estoque: { [isEntrada ? 'increment' : 'decrement']: quantidade },
        quantidade_disponivel: { [isEntrada ? 'increment' : 'decrement']: quantidade },
      },
    });

    // registra movimento na tabela entrada_estoque (positivo para entrada, negativo para saída)
    await prisma.entrada_estoque.create({
      data: {
        produto_id: produtoId,
        quantidade: isEntrada ? quantidade : -quantidade,
        data_entrada: new Date(),
        tipo_entrada: isEntrada ? 1 : 2,
      },
    });

    return Response.json(
      {
        produto_atualizado: {
          id: produtoAtualizado.id,
          codigo: produtoAtualizado.codigo,
          descricao: produtoAtualizado.descricao,
          quantidade_estoque: produtoAtualizado.quantidade_estoque,
          quantidade_disponivel: produtoAtualizado.quantidade_disponivel,
        },
        tipo_ajuste,
        motivo: motivo || (isEntrada ? 'Ajuste de entrada' : 'Ajuste de saída'),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao processar requisição POST de ajustes:', error);
    return Response.json(
      { message: 'Erro interno do servidor ao processar requisição.' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return Response.json({ message: 'Use POST em /api/estoque/ajustes' }, { status: 405 });
}
