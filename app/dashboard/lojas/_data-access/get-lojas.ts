// app/dashboard/lojas/_data_access/get-lojas.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Função para buscar todas as lojas
 * @returns Promise<NextResponse> - Lista de lojas ou erro
 */
export async function getLojas() {
  try {
    const lojas = await prisma.lojas.findMany({
      orderBy: {
        nome: 'asc', // Ordena as lojas por nome em ordem alfabética
      },
      include: {
        estoque_por_loja: {
          select: {
            quantidade_estoque: true,
            quantidade_mostruario: true,
            quantidade_disponivel: true,
          }
        }
      }
    });

    // Calcula o total de produtos por loja
    const lojasComTotal = lojas.map(loja => {
      const totalProdutos = loja.estoque_por_loja.reduce((acc, estoque) => 
        acc + estoque.quantidade_estoque + estoque.quantidade_mostruario, 0
      );
      
      return {
        ...loja,
        qtd_total_prod: totalProdutos
      };
    });

    return NextResponse.json(lojasComTotal, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar lojas:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar lojas." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar uma loja específica por ID
 * @param id - ID da loja
 * @returns Promise<NextResponse> - Loja encontrada ou erro
 */
export async function getLojaById(id: number) {
  try {
    const loja = await prisma.lojas.findUnique({
      where: { id },
      include: {
        estoque_por_loja: {
          include: {
            produto: {
              select: {
                id: true,
                codigo: true,
                descricao: true,
                preco_venda: true
              }
            }
          }
        }
      }
    });

    if (!loja) {
      return NextResponse.json(
        { message: "Loja não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(loja, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar loja:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar loja." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar lojas por nome
 * @param nome - Nome da loja
 * @returns Promise<NextResponse> - Lojas encontradas ou erro
 */
export async function getLojasByNome(nome: string) {
  try {
    const lojas = await prisma.lojas.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive'
        }
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return NextResponse.json(lojas, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar lojas por nome:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar lojas." },
      { status: 500 }
    );
  }
}
