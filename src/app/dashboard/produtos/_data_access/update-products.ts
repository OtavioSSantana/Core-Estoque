// app/dashboard/produtos/_data_access/update-products.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para os dados de atualização de produto
 */
export interface UpdateProductData {
  id: string | number;
  codigo: string;
  descricao: string;
  fornecedor: string;
  preco_venda: string | number;
}

/**
 * Função para atualizar um produto existente
 * @param data - Dados do produto a ser atualizado
 * @returns Promise<NextResponse> - Produto atualizado ou erro
 */
export async function updateProduct(data: UpdateProductData) {
  try {
    // Valida os campos obrigatórios
    const { id, codigo, descricao, fornecedor, preco_venda } = data;
    
    if (!id || !codigo || !descricao || !fornecedor || !preco_venda) {
      return NextResponse.json(
        { message: "Campos obrigatórios: id, codigo, descricao, fornecedor, preco_venda" },
        { status: 400 }
      );
    }

    // Verifica se o produto existe
    const produtoExistente = await prisma.produtos.findUnique({
      where: { id: parseInt(id.toString()) }
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { message: "Produto não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se o código já existe em outro produto
    const codigoExistente = await prisma.produtos.findFirst({
      where: { 
        codigo: codigo.trim(),
        id: { not: parseInt(id.toString()) } // Exclui o produto atual da busca
      }
    });

    if (codigoExistente) {
      return NextResponse.json(
        { message: "Já existe outro produto com este código" },
        { status: 409 }
      );
    }

    // Atualiza o produto (sem alterar quantidades - são gerenciadas via estoque_loja)
    const produtoAtualizado = await prisma.produtos.update({
      where: { id: parseInt(id.toString()) },
      data: {
        codigo: codigo.trim(),
        descricao: descricao.trim(),
        fornecedor: fornecedor.trim(),
        preco_venda: parseFloat(preco_venda.toString()),
      }
    });

    // Retorna o produto atualizado com status 200 (OK)
    return NextResponse.json(produtoAtualizado, { status: 200 });

  } catch (error) {
    // Em caso de erro no servidor
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao atualizar produto." },
      { status: 500 }
    );
  }
}

/**
 * Função para validar dados de atualização de produto
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateUpdateProductData(data: UpdateProductData): string[] {
  const errors: string[] = [];

  if (!data.id) {
    errors.push("ID é obrigatório");
  }

  if (!data.codigo?.trim()) {
    errors.push("Código é obrigatório");
  }

  if (!data.descricao?.trim()) {
    errors.push("Descrição é obrigatória");
  }

  if (!data.fornecedor?.trim()) {
    errors.push("Fornecedor é obrigatório");
  }

  if (!data.preco_venda || isNaN(parseFloat(data.preco_venda.toString()))) {
    errors.push("Preço de venda deve ser um número válido");
  }


  return errors;
}
