import { NextRequest, NextResponse } from 'next/server';
import { getUsuarios } from '@/app/dashboard/usuarios/_data_access/get-usuarios';
import { createUsuario } from '@/app/dashboard/usuarios/_data_access/create-usuarios';

// GET /api/usuarios - Listar todos os usuários
export async function GET(request: NextRequest) {
  try {
    const result = await getUsuarios();
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/usuarios - Criar novo usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Garantir que senha seja número
    if (body.senha && typeof body.senha === 'string') {
      body.senha = parseInt(body.senha, 10);
    }
    
    const result = await createUsuario(body);
    
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    
    // Retornar mensagem mais específica
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return NextResponse.json(
      { message: `Erro ao processar requisição: ${errorMessage}` },
      { status: 500 }
    );
  }
}