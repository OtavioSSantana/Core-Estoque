import { NextRequest, NextResponse } from 'next/server';
import { activateUsuario, deactivateUsuario } from '@/app/dashboard/usuarios/_data_access/delete-usuarios';

// PUT /api/usuarios/[id]/activate - Ativar usuário
// PUT /api/usuarios/[id]/deactivate - Desativar usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; action: string }> }
) {
  try {
    const { id: idParam, action } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    let result: NextResponse;
    
    if (action === 'activate') {
      result = await activateUsuario(id);
    } else if (action === 'deactivate') {
      result = await deactivateUsuario(id);
    } else {
      return NextResponse.json(
        { message: 'Ação inválida. Use "activate" ou "deactivate"' },
        { status: 400 }
      );
    }
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao alterar status do usuário:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}