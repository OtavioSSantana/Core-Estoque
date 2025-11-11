import prisma from '@/lib/prisma';

export interface ResultadoBuscaEstoque {
  pode_atender: boolean;
  lojas_para_descontar: Array<{
    loja_id: number;
    quantidade: number;
  }>;
  total_disponivel: number;
}

/**
 * Busca estoque disponível para um produto
 * Prioridade: loja do pedido → outras lojas
 * Pode combinar estoque de múltiplas lojas se necessário
 * 
 * @param produtoId - ID do produto
 * @param quantidadeNecessaria - Quantidade necessária
 * @param lojaPedido - ID da loja do pedido
 * @returns Resultado com informações de estoque disponível
 */
export async function buscarEstoqueDisponivel(
  produtoId: number,
  quantidadeNecessaria: number,
  lojaPedido: number
): Promise<ResultadoBuscaEstoque> {
  try {
    // 1. Buscar estoque na loja do pedido primeiro
    const estoqueLojaPedido = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: produtoId,
          loja_id: lojaPedido
        }
      }
    });
    
    const disponivelLojaPedido = estoqueLojaPedido?.quantidade_disponivel || 0;
    
    // Se tem estoque suficiente na loja do pedido, usar só ela
    if (disponivelLojaPedido >= quantidadeNecessaria) {
      return {
        pode_atender: true,
        lojas_para_descontar: [{
          loja_id: lojaPedido,
          quantidade: quantidadeNecessaria
        }],
        total_disponivel: disponivelLojaPedido
      };
    }
    
    // 2. Se não tem na loja do pedido, buscar em todas as outras lojas
    const todosEstoques = await prisma.estoque_loja.findMany({
      where: {
        produto_id: produtoId,
        quantidade_disponivel: { gt: 0 }
      },
      orderBy: {
        quantidade_disponivel: 'desc'
      }
    });
    
    // 3. Calcular quanto falta após usar loja do pedido
    let quantidadeRestante = quantidadeNecessaria;
    const lojasParaDescontar: Array<{ loja_id: number; quantidade: number }> = [];
    
    // Se tem algo na loja do pedido, usar primeiro
    if (disponivelLojaPedido > 0) {
      lojasParaDescontar.push({
        loja_id: lojaPedido,
        quantidade: disponivelLojaPedido
      });
      quantidadeRestante -= disponivelLojaPedido;
    }
    
    // 4. Buscar nas outras lojas para completar
    for (const estoque of todosEstoques) {
      // Pular a loja do pedido (já foi considerada)
      if (estoque.loja_id === lojaPedido) continue;
      
      if (quantidadeRestante <= 0) break; // Já temos o suficiente
      
      const disponivel = estoque.quantidade_disponivel || 0;
      
      if (disponivel > 0) {
        const quantidadeUsar = Math.min(disponivel, quantidadeRestante);
        
        lojasParaDescontar.push({
          loja_id: estoque.loja_id,
          quantidade: quantidadeUsar
        });
        
        quantidadeRestante -= quantidadeUsar;
      }
    }
    
    // 5. Verificar se conseguiu atender tudo
    const totalDisponivel = lojasParaDescontar.reduce(
      (sum, item) => sum + item.quantidade, 
      0
    );
    
    return {
      pode_atender: quantidadeRestante <= 0,
      lojas_para_descontar: lojasParaDescontar,
      total_disponivel: totalDisponivel
    };
  } catch (error) {
    console.error('Erro ao buscar estoque disponível:', error);
    return {
      pode_atender: false,
      lojas_para_descontar: [],
      total_disponivel: 0
    };
  }
}

