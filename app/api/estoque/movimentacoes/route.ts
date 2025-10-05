// app/api/estoque/movimentacoes/route.ts

import { NextRequest } from 'next/server';
import { createMovimentacao } from '../../../dashboard/estoque/_data_access/create-movimentacao';

/**
 * Função para lidar com requisições POST (criar movimentação de entrada)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // garantir suporte a campos loja_id e tipo_movimento vindo do client
    return await createMovimentacao(body);
  } catch (error) {
    console.error("Erro ao processar requisição POST de movimentação:", error);
    return Response.json(
      { message: "Erro interno do servidor ao processar requisição." },
      { status: 500 }
    );
  }
}
