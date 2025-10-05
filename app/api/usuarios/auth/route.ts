import { NextRequest } from 'next/server';
import { authenticateUsuario } from '../../../dashboard/usuarios/_data_access/get-usuarios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login, senha } = body;
    
    if (!login || !senha) {
      return Response.json(
        { message: "Login e senha são obrigatórios" },
        { status: 400 }
      );
    }

    return await authenticateUsuario(login, senha);
  } catch (error) {
    console.error('Erro ao processar autenticação:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
