import { NextRequest } from 'next/server';
import { getLojas } from '../../dashboard/lojas/_data-access/get-lojas';
import { createLoja, validateCreateLojaData } from '../../dashboard/lojas/_data-access/create-lojas';

export async function GET() {
  return await getLojas();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Valida os dados
    const errors = validateCreateLojaData(body);
    if (errors.length > 0) {
      return Response.json(
        { message: "Dados inválidos", errors },
        { status: 400 }
      );
    }

    return await createLoja(body);
  } catch (error) {
    console.error('Erro ao processar requisição POST:', error);
    return Response.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
