import { NextRequest, NextResponse } from 'next/server';
import { getPedidos, FiltrosPedidos } from '@/app/dashboard/pedidos/_data_access/get-pedidos';

/**
 * Endpoint para listar pedidos
 * GET /api/tiny/pedidos
 * 
 * Query params:
 * - page: número da página
 * - pageSize: itens por página
 * - status: filtrar por status
 * - loja_id: filtrar por loja
 * - data_inicio: data inicial (YYYY-MM-DD)
 * - data_fim: data final (YYYY-MM-DD)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filtros: FiltrosPedidos = {};
    
    if (searchParams.get('page')) {
      filtros.page = parseInt(searchParams.get('page') || '1');
    }
    
    if (searchParams.get('pageSize')) {
      filtros.pageSize = parseInt(searchParams.get('pageSize') || '20');
    }
    
    if (searchParams.get('status')) {
      filtros.status = searchParams.get('status') || undefined;
    }
    
    if (searchParams.get('loja_id')) {
      filtros.loja_id = parseInt(searchParams.get('loja_id') || '0');
    }
    
    if (searchParams.get('data_inicio')) {
      filtros.data_inicio = searchParams.get('data_inicio') || undefined;
    }
    
    if (searchParams.get('data_fim')) {
      filtros.data_fim = searchParams.get('data_fim') || undefined;
    }

    const resultado = await getPedidos(filtros);
    
    return NextResponse.json(resultado, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar pedidos' },
      { status: 500 }
    );
  }
}

