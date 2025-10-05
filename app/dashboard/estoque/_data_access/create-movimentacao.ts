// app/dashboard/estoque/_data_access/create-movimentacao.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para dados de criação de movimentação de estoque
 */
export interface CreateMovimentacaoData {
  produto_id: string | number;
  quantidade: string | number;
  fornecedor_id?: string | number;
  tipo_entrada?: string | number; // manter compat por enquanto
  tipo_movimento?: string | number; // preferido: chave em tipo_movimento
  loja_id?: string | number; // loja onde a movimentação ocorre
}

/**
 * Função para criar uma nova movimentação de entrada no estoque
 * @param data - Dados da movimentação a ser criada
 * @returns Promise<NextResponse> - Movimentação criada ou erro
 */
export async function createMovimentacao(data: CreateMovimentacaoData) {
  try {
    // Valida os campos obrigatórios
    const { produto_id, quantidade } = data;
    
    if (!produto_id || !quantidade) {
      return NextResponse.json(
        { message: "Campos obrigatórios: produto_id, quantidade" },
        { status: 400 }
      );
    }

    const produtoId = parseInt(produto_id.toString());
    const quantidadeMov = parseInt(quantidade.toString());

    // Verifica se o produto existe
    const produtoExistente = await prisma.produtos.findUnique({
      where: { id: produtoId }
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { message: "Produto não encontrado" },
        { status: 404 }
      );
    }

    // Valida se a quantidade é positiva
    if (quantidadeMov <= 0) {
      return NextResponse.json(
        { message: "Quantidade deve ser maior que zero" },
        { status: 400 }
      );
    }

    // Valida loja se fornecida
    let lojaIdToApply: number | null = null;
    if (data.loja_id !== undefined && data.loja_id !== null && data.loja_id !== '') {
      const lojaParsed = parseInt(data.loja_id.toString());
      if (isNaN(lojaParsed) || lojaParsed <= 0) {
        return NextResponse.json(
          { message: "loja_id inválido" },
          { status: 400 }
        );
      }
      const lojaExists = await prisma.lojas.findUnique({ where: { id: lojaParsed } });
      if (!lojaExists) {
        return NextResponse.json(
          { message: "Loja não encontrada" },
          { status: 404 }
        );
      }
      lojaIdToApply = lojaParsed;
    }

    // Resolver tipo de movimento a registrar (tabela tipo_movimento)
    let tipoMovimentoChave: number | null = null;
    if (data.tipo_movimento !== undefined && data.tipo_movimento !== null && data.tipo_movimento !== '') {
      const parsed = parseInt(data.tipo_movimento.toString());
      if (!isNaN(parsed)) {
        const tipo = await prisma.tipo_movimento.findUnique({ where: { chave: parsed } });
        if (!tipo) {
          return NextResponse.json(
            { message: "tipo_movimento não encontrado" },
            { status: 400 }
          );
        }
        tipoMovimentoChave = parsed;
      }
    } else if (data.tipo_entrada !== undefined && data.tipo_entrada !== null && data.tipo_entrada !== '') {
      // fallback para campo legado tipo_entrada
      const parsed = parseInt(data.tipo_entrada.toString());
      if (!isNaN(parsed)) {
        tipoMovimentoChave = parsed;
      }
    }

    // Cria a movimentação na tabela entrada_estoque
    const novaMovimentacao = await prisma.entrada_estoque.create({
      data: {
        produto_id: produtoId,
        quantidade: quantidadeMov,
        fornecedor_id: data.fornecedor_id ? parseInt(data.fornecedor_id.toString()) : null,
        tipo_entrada: tipoMovimentoChave,
        data_entrada: new Date(),
        loja_id: lojaIdToApply,
      }
    });

    // Atualiza a quantidade em estoque do produto
    const produtoAtualizado = await prisma.produtos.update({
      where: { id: produtoId },
      data: {
        quantidade_estoque: {
          increment: quantidadeMov
        },
        quantidade_disponivel: {
          increment: quantidadeMov
        }
      }
    });

    // Atualiza/insere saldo por loja
    if (lojaIdToApply !== null) {
      await prisma.estoque_loja.upsert({
        where: { produto_id_loja_id: { produto_id: produtoId, loja_id: lojaIdToApply } as any },
        update: {
          quantidade_estoque: { increment: quantidadeMov },
          quantidade_disponivel: { increment: quantidadeMov },
        },
        create: {
          produto_id: produtoId,
          loja_id: lojaIdToApply,
          quantidade_estoque: quantidadeMov,
          quantidade_disponivel: quantidadeMov,
          quantidade_mostruario: 0,
        },
      } as any);
    }

    // Retorna a movimentação criada junto com os dados do produto atualizado
    const resultado = {
      movimentacao: novaMovimentacao,
      produto_atualizado: {
        id: produtoAtualizado.id,
        codigo: produtoAtualizado.codigo,
        descricao: produtoAtualizado.descricao,
        quantidade_estoque: produtoAtualizado.quantidade_estoque,
        quantidade_disponivel: produtoAtualizado.quantidade_disponivel
      }
    };

    return NextResponse.json(resultado, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar movimentação de estoque:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao criar movimentação." },
      { status: 500 }
    );
  }
}

/**
 * Função para validar dados de criação de movimentação
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateCreateMovimentacaoData(data: CreateMovimentacaoData): string[] {
  const errors: string[] = [];

  if (!data.produto_id) {
    errors.push("ID do produto é obrigatório");
  } else if (isNaN(parseInt(data.produto_id.toString()))) {
    errors.push("ID do produto deve ser um número válido");
  }

  if (!data.quantidade) {
    errors.push("Quantidade é obrigatória");
  } else if (isNaN(parseInt(data.quantidade.toString()))) {
    errors.push("Quantidade deve ser um número válido");
  } else if (parseInt(data.quantidade.toString()) <= 0) {
    errors.push("Quantidade deve ser maior que zero");
  }

  if (data.fornecedor_id && isNaN(parseInt(data.fornecedor_id.toString()))) {
    errors.push("ID do fornecedor deve ser um número válido");
  }

  if (data.tipo_entrada && isNaN(parseInt(data.tipo_entrada.toString()))) {
    errors.push("Tipo de entrada deve ser um número válido");
  }

  return errors;
}
