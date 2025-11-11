import { NextRequest, NextResponse } from 'next/server';
import { processarPedido } from '@/app/dashboard/pedidos/_data_access/processar-pedido';

/**
 * Endpoint para processar pedido (baixar estoque)
 * POST /api/tiny/pedidos/{id}/processar
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pedidoId = parseInt(id);
    
    if (isNaN(pedidoId)) {
      return NextResponse.json(
        { message: 'ID do pedido inválido' },
        { status: 400 }
      );
    }

    const resultado = await processarPedido(pedidoId);
    
    if (!resultado.success) {
      return NextResponse.json(
        {
          message: resultado.error || 'Erro ao processar pedido',
          itens_sem_estoque: resultado.itens_sem_estoque,
          produtos_criados: resultado.produtos_criados,
          instrucoes: resultado.itens_sem_estoque 
            ? 'Atualize o estoque dos itens listados e tente processar novamente'
            : undefined
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pedido processado e estoque atualizado',
      produtos_criados: resultado.produtos_criados,
      estoque_descontado_de: resultado.estoque_descontado_de,
      itens_processados: resultado.itens_processados,
      observacao: resultado.observacao
    }, { status: 200 });
    
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    return NextResponse.json(
      { message: 'Erro ao processar pedido' },
      { status: 500 }
    );
  }
}

