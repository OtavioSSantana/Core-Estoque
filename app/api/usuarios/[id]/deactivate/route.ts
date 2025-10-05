import { NextRequest } from 'next/server';
import { deactivateUsuario, validateUsuarioId } from '../../../../dashboard/usuarios/_data_access/delete-usuarios';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Valida o ID
    const errors = validateUsuarioId(id);
    if (errors.length > 0) {
      return Response.json(
        { message: "ID inválido", errors },
        { status: 400 }
      );
    }

    return await deactivateUsuario(id);
  } catch (error) {
    console.error('Erro ao processar requisição PUT:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
