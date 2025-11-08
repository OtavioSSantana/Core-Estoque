import { NextRequest, NextResponse } from 'next/server';
import { getLojaById } from '@/app/dashboard/lojas/_data-access/get-lojas';
import { updateLoja } from '@/app/dashboard/lojas/_data-access/update-lojas';
import { deleteLoja } from '@/app/dashboard/lojas/_data-access/delete-lojas';

// GET /api/lojas/[id] - Buscar loja por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const result = await getLojaById(id);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao buscar loja:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/lojas/[id] - Atualizar loja
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const result = await updateLoja(id, body);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao atualizar loja:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/lojas/[id] - Deletar loja
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const result = await deleteLoja(id);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao deletar loja:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

