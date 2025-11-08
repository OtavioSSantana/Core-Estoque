// app/dashboard/produtos/_data_access/create-products.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para os dados de criação de produto
 */
export interface CreateProductData {
  codigo: string;
  descricao: string;
  fornecedor: string;
  preco_venda: string | number;
}

/**
 * Função para criar um novo produto
 * @param data - Dados do produto a ser criado
 * @returns Promise<NextResponse> - Produto criado ou erro
 */
export async function createProduct(data: CreateProductData) {
  try {
    // Valida os campos obrigatórios
    const { codigo, descricao, fornecedor, preco_venda } = data;
    
    if (!codigo || !descricao || !fornecedor || !preco_venda) {
      return NextResponse.json(
        { message: "Campos obrigatórios: codigo, descricao, fornecedor, preco_venda" },
        { status: 400 }
      );
    }

    // Verifica se o código já existe
    const produtoExistente = await prisma.produtos.findUnique({
      where: { codigo }
    });

    if (produtoExistente) {
      return NextResponse.json(
        { message: "Já existe um produto com este código" },
        { status: 409 }
      );
    }

    // Cria o novo produto (quantidades são gerenciadas via estoque_loja)
    const novoProduto = await prisma.produtos.create({
      data: {
        codigo: codigo.trim(),
        descricao: descricao.trim(),
        fornecedor: fornecedor.trim(),
        preco_venda: parseFloat(preco_venda.toString()),
      }
    });

    // Retorna o produto criado com status 201 (Created)
    return NextResponse.json(novoProduto, { status: 201 });

  } catch (error) {
    // Em caso de erro no servidor
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao criar produto." },
      { status: 500 }
    );
  }
}

/**
 * Função para validar dados de criação de produto
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateCreateProductData(data: CreateProductData): string[] {
  const errors: string[] = [];

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
