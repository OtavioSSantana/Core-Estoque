// app/api/products/route.ts

import { NextRequest } from 'next/server';
import { getProducts } from '../../dashboard/produtos/_data_access/get-products';
import { createProduct } from '../../dashboard/produtos/_data_access/create-products';
import { updateProduct } from '../../dashboard/produtos/_data_access/update-products';
import { deleteProduct } from '../../dashboard/produtos/_data_access/delete-products';

/**
 * Função para lidar com requisições GET (buscar produtos)
 */
export async function GET(request: NextRequest) {
  return await getProducts();
}

/**
 * Função para lidar com requisições POST (criar produto)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return await createProduct(body);
  } catch (error) {
    console.error("Erro ao processar requisição POST:", error);
    return Response.json(
      { message: "Erro interno do servidor ao processar requisição." },
      { status: 500 }
    );
  }
}

/**
 * Função para lidar com requisições PUT (editar produto)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    return await updateProduct(body);
  } catch (error) {
    console.error("Erro ao processar requisição PUT:", error);
    return Response.json(
      { message: "Erro interno do servidor ao processar requisição." },
      { status: 500 }
    );
  }
}

/**
 * Função para lidar com requisições DELETE (deletar produto)
 */
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return Response.json(
        { message: "ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    return await deleteProduct(id);
  } catch (error) {
    console.error("Erro ao processar requisição DELETE:", error);
    return Response.json(
      { message: "Erro interno do servidor ao processar requisição." },
      { status: 500 }
    );
  }
}