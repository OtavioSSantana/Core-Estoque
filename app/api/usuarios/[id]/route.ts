import { NextRequest } from 'next/server';
import { getUsuarioById } from '../../../dashboard/usuarios/_data_access/get-usuarios';
import { updateUsuario, validateUpdateUsuarioData } from '../../../dashboard/usuarios/_data_access/update-usuarios';
import { deleteUsuario, validateUsuarioId, deactivateUsuario, activateUsuario } from '../../../dashboard/usuarios/_data_access/delete-usuarios';

export async function GET(
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

    return await getUsuarioById(id);
  } catch (error) {
    console.error('Erro ao processar requisição GET:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    // Valida o ID
    const idErrors = validateUsuarioId(id);
    if (idErrors.length > 0) {
      return Response.json(
        { message: "ID inválido", errors: idErrors },
        { status: 400 }
      );
    }

    // Valida os dados
    const errors = validateUpdateUsuarioData(body);
    if (errors.length > 0) {
      return Response.json(
        { message: "Dados inválidos", errors },
        { status: 400 }
      );
    }

    return await updateUsuario(id, body);
  } catch (error) {
    console.error('Erro ao processar requisição PUT:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    return await deleteUsuario(id);
  } catch (error) {
    console.error('Erro ao processar requisição DELETE:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
