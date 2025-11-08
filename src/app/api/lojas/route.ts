import { NextRequest, NextResponse } from 'next/server';
import { getLojas } from '@/app/dashboard/lojas/_data-access/get-lojas';
import { createLoja } from '@/app/dashboard/lojas/_data-access/create-lojas';

// GET /api/lojas - Listar todas as lojas
export async function GET(request: NextRequest) {
  try {
    const result = await getLojas();
    
    // getLojas retorna NextResponse, então precisamos extrair o JSON
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao buscar lojas:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/lojas - Criar nova loja
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createLoja(body);
    
    // createLoja retorna NextResponse
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao criar loja:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

