import { NextRequest, NextResponse } from 'next/server';
import { getUsuarioById } from '@/app/dashboard/usuarios/_data_access/get-usuarios';
import { updateUsuario } from '@/app/dashboard/usuarios/_data_access/update-usuarios';
import { deleteUsuario } from '@/app/dashboard/usuarios/_data_access/delete-usuarios';

// GET /api/usuarios/[id] - Buscar usuário por ID
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
    
    const result = await getUsuarioById(id);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/usuarios/[id] - Atualizar usuário
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
    const result = await updateUsuario(id, body);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/usuarios/[id] - Deletar usuário
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
    
    const result = await deleteUsuario(id);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}