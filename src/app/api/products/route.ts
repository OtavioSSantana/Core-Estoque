import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/app/dashboard/produtos/_data_access/get-products';
import { createProduct } from '@/app/dashboard/produtos/_data_access/create-products';
import { updateProduct } from '@/app/dashboard/produtos/_data_access/update-products';
import { deleteProduct } from '@/app/dashboard/produtos/_data_access/delete-products';

// GET /api/products - Listar todos os produtos
export async function GET() {
  try {
    const result = await getProducts();
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/products - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createProduct(body);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/products - Atualizar produto
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await updateProduct(body);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/products?id=123 - Deletar produto
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID do produto é obrigatório' },
        { status: 400 }
      );
    }
    
    const result = await deleteProduct(id);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

