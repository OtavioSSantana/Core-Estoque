import { NextRequest } from 'next/server';
import { getLojaById } from '../../../dashboard/lojas/_data-access/get-lojas';
import { updateLoja, validateUpdateLojaData } from '../../../dashboard/lojas/_data-access/update-lojas';
import { deleteLoja, validateLojaId } from '../../../dashboard/lojas/_data-access/delete-lojas';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Valida o ID
    const errors = validateLojaId(id);
    if (errors.length > 0) {
      return Response.json(
        { message: "ID inválido", errors },
        { status: 400 }
      );
    }

    return await getLojaById(id);
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
    const idErrors = validateLojaId(id);
    if (idErrors.length > 0) {
      return Response.json(
        { message: "ID inválido", errors: idErrors },
        { status: 400 }
      );
    }

    // Valida os dados
    const errors = validateUpdateLojaData(body);
    if (errors.length > 0) {
      return Response.json(
        { message: "Dados inválidos", errors },
        { status: 400 }
      );
    }

    return await updateLoja(id, body);
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
    const errors = validateLojaId(id);
    if (errors.length > 0) {
      return Response.json(
        { message: "ID inválido", errors },
        { status: 400 }
      );
    }

    return await deleteLoja(id);
  } catch (error) {
    console.error('Erro ao processar requisição DELETE:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
