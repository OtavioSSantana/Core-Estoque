import prisma from '@/lib/prisma';

export interface FiltrosPedidos {
  page?: number;
  pageSize?: number;
  status?: string;
  loja_id?: number;
  data_inicio?: string;
  data_fim?: string;
}

/**
 * Busca pedidos com filtros e paginação
 * 
 * @param filtros - Filtros opcionais para busca
 * @returns Array de pedidos ou objeto com pedidos e meta
 */
export async function getPedidos(filtros?: FiltrosPedidos) {
  try {
    const page = filtros?.page || 1;
    const pageSize = filtros?.pageSize || 20;
    const skip = (page - 1) * pageSize;

    // Construir where clause
    const where: any = {};

    if (filtros?.status && filtros.status !== 'all') {
      where.status = filtros.status;
    }

    if (filtros?.loja_id) {
      where.loja_id = filtros.loja_id;
    }

    if (filtros?.data_inicio || filtros?.data_fim) {
      where.data_pedido = {};
      if (filtros.data_inicio) {
        where.data_pedido.gte = new Date(filtros.data_inicio);
      }
      if (filtros.data_fim) {
        where.data_pedido.lte = new Date(filtros.data_fim);
      }
    }

    // Buscar total de registros
    const total = await prisma.pedidos.count({ where });

    // Buscar pedidos
    const pedidos = await prisma.pedidos.findMany({
      where,
      include: {
        itens: true,
        loja_ref: {
          select: {
            id: true,
            nome: true
          }
        }
      },
      orderBy: {
        data_pedido: 'desc'
      },
      skip,
      take: pageSize
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      pedidos,
      meta: {
        total,
        page,
        pageSize,
        totalPages
      }
    };
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return {
      pedidos: [],
      meta: {
        total: 0,
        page: 1,
        pageSize: 20,
        totalPages: 0
      }
    };
  }
}

