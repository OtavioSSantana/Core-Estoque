import prisma from '@/lib/prisma';

export interface PedidoTiny {
  id_vendedor?: string;
  nome_vendedor?: string;
}

/**
 * Determina qual loja deve ser usada para descontar estoque
 * Busca o vendedor pelo id_vendedor_tiny e usa a loja associada ao usuário
 * 
 * @param pedido - Dados do pedido do Tiny com informações do vendedor
 * @returns ID da loja ou null se não encontrar
 */
export async function determinarLojaPedido(
  pedido: PedidoTiny
): Promise<number | null> {
  try {
    // 1. Buscar usuário pelo id_vendedor_tiny
    if (pedido.id_vendedor) {
      const vendedor = await prisma.usuarios.findFirst({
        where: {
          id_vendedor_tiny: pedido.id_vendedor,
          inativo: false
        },
        select: {
          id: true,
          nome: true,
          loja: true
        }
      });
      
      if (vendedor && vendedor.loja) {
        // Verificar se a loja existe
        const loja = await prisma.lojas.findUnique({
          where: { id: vendedor.loja }
        });
        
        if (loja) {
          return vendedor.loja;
        }
      }
    }
    
    // 2. Fallback: tentar buscar pelo nome (menos confiável)
    if (pedido.nome_vendedor) {
      const vendedor = await prisma.usuarios.findFirst({
        where: {
          nome: {
            contains: pedido.nome_vendedor,
            mode: 'insensitive'
          },
          inativo: false,
          loja: { not: null }
        },
        select: {
          loja: true
        }
      });
      
      if (vendedor?.loja) {
        const loja = await prisma.lojas.findUnique({
          where: { id: vendedor.loja }
        });
        
        if (loja) {
          return vendedor.loja;
        }
      }
    }
    
    // 3. Último fallback: loja padrão configurada
    const lojaPadrao = process.env.LOJA_PADRAO_PEDIDOS;
    if (lojaPadrao) {
      const lojaId = parseInt(lojaPadrao);
      if (!isNaN(lojaId)) {
        const loja = await prisma.lojas.findUnique({
          where: { id: lojaId }
        });
        if (loja) {
          return lojaId;
        }
      }
    }
    
    // 4. Retornar null se não encontrar
    return null;
  } catch (error) {
    console.error('Erro ao determinar loja do pedido:', error);
    return null;
  }
}

