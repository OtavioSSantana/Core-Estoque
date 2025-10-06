import { NextRequest } from 'next/server';
import { getUsuarios } from '../../dashboard/usuarios/_data_access/get-usuarios';
import { createUsuario, validateCreateUsuarioData } from '../../dashboard/usuarios/_data_access/create-usuarios';

export async function GET() {
  return await getUsuarios();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Valida os dados
    const errors = validateCreateUsuarioData(body);
    if (errors.length > 0) {
      return Response.json(
        { message: "Dados inválidos", errors },
        { status: 400 }
      );
    }

    return await createUsuario(body);
  } catch (error) {
    console.error('Erro ao processar requisição POST:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
