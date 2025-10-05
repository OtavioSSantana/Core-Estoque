// app/dashboard/produtos/_data_access/get-products.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Função para buscar todos os produtos
 * @returns Promise<NextResponse> - Lista de produtos ou erro
 */
export async function getProducts() {
  try {
    // Usa o Prisma Client para buscar todos os registros da tabela 'produtos'
    // O nome 'produtos' vem do 'model produtos' no seu schema.prisma
    const products = await prisma.produtos.findMany({
      // Você pode adicionar opções aqui para customizar a busca
      orderBy: {
        descricao: 'asc', // Ordena os produtos por descrição em ordem alfabética
      },
    });

    // Retorna os produtos encontrados como uma resposta JSON com status 200 (OK)
    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    // Em caso de erro no servidor (ex: problema de conexão com o banco),
    // retorna uma mensagem de erro com status 500
    console.error("Erro ao buscar produtos:", error); // Loga o erro no console do servidor para depuração
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar produtos." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar um produto específico por ID
 * @param id - ID do produto
 * @returns Promise<NextResponse> - Produto encontrado ou erro
 */
export async function getProductById(id: number) {
  try {
    const product = await prisma.produtos.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar produto." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar produtos por código
 * @param codigo - Código do produto
 * @returns Promise<NextResponse> - Produto encontrado ou erro
 */
export async function getProductByCode(codigo: string) {
  try {
    const product = await prisma.produtos.findUnique({
      where: { codigo }
    });

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar produto por código:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar produto." },
      { status: 500 }
    );
  }
}
