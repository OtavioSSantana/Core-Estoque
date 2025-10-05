// app/dashboard/produtos/_data_access/delete-products.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Função para deletar um produto
 * @param id - ID do produto a ser deletado
 * @returns Promise<NextResponse> - Confirmação de exclusão ou erro
 */
export async function deleteProduct(id: string | number) {
  try {
    if (!id) {
      return NextResponse.json(
        { message: "ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    const productId = parseInt(id.toString());

    // Verifica se o produto existe
    const produtoExistente = await prisma.produtos.findUnique({
      where: { id: productId }
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { message: "Produto não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se o produto tem movimentações de estoque (entrada_estoque)
    const movimentacoes = await prisma.entrada_estoque.findMany({
      where: { produto_id: productId }
    });

    if (movimentacoes.length > 0) {
      return NextResponse.json(
        { message: "Não é possível deletar produto com movimentações de estoque" },
        { status: 409 }
      );
    }

    // Remove o produto
    await prisma.produtos.delete({
      where: { id: productId }
    });

    // Retorna sucesso com status 200 (OK)
    return NextResponse.json(
      { message: "Produto deletado com sucesso", id: productId },
      { status: 200 }
    );

  } catch (error) {
    // Em caso de erro no servidor
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao deletar produto." },
      { status: 500 }
    );
  }
}

/**
 * Função para verificar se um produto pode ser deletado
 * @param id - ID do produto
 * @returns Promise<{canDelete: boolean, reason?: string}> - Resultado da verificação
 */
export async function canDeleteProduct(id: string | number) {
  try {
    const productId = parseInt(id.toString());

    // Verifica se o produto existe
    const produtoExistente = await prisma.produtos.findUnique({
      where: { id: productId }
    });

    if (!produtoExistente) {
      return { canDelete: false, reason: "Produto não encontrado" };
    }

    // Verifica se o produto tem movimentações de estoque
    const movimentacoes = await prisma.entrada_estoque.findMany({
      where: { produto_id: productId }
    });

    if (movimentacoes.length > 0) {
      return { 
        canDelete: false, 
        reason: "Produto possui movimentações de estoque" 
      };
    }

    return { canDelete: true };

  } catch (error) {
    console.error("Erro ao verificar se produto pode ser deletado:", error);
    return { canDelete: false, reason: "Erro interno do servidor" };
  }
}

/**
 * Função para validar ID de produto
 * @param id - ID a ser validado
 * @returns string[] - Array de erros encontrados
 */
export function validateProductId(id: string | number): string[] {
  const errors: string[] = [];

  if (!id) {
    errors.push("ID é obrigatório");
  } else if (isNaN(parseInt(id.toString()))) {
    errors.push("ID deve ser um número válido");
  }

  return errors;
}
