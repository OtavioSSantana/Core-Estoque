import prisma from '@/lib/prisma';
import { criarOuBuscarProduto } from '@/app/api/tiny/sync/utils/criar-ou-buscar-produto';
import { buscarEstoqueDisponivel } from '@/app/api/tiny/sync/utils/buscar-estoque-disponivel';

export interface ItemSemEstoque {
  item_id: number;
  descricao: string;
  quantidade_necessaria: number;
  total_disponivel: number;
  lojas_com_estoque: Array<{ loja_id: number; quantidade: number }>;
}

export interface ProdutoCriado {
  produto_id: number;
  codigo: string;
  descricao: string;
}

export interface ResultadoProcessamento {
  success: boolean;
  produtos_criados?: ProdutoCriado[];
  estoque_descontado_de?: Array<{ loja_id: number; quantidade_total: number }>;
  itens_processados: number;
  observacao?: string;
  error?: string;
  itens_sem_estoque?: ItemSemEstoque[];
}

/**
 * Processa um pedido: cria produtos se necessário, valida estoque e descontar
 * 
 * @param pedidoId - ID do pedido a ser processado
 * @returns Resultado do processamento
 */
export async function processarPedido(pedidoId: number): Promise<ResultadoProcessamento> {
  try {
    // 1. Buscar pedido com itens
    const pedido = await prisma.pedidos.findUnique({
      where: { id: pedidoId },
      include: { itens: true }
    });

    if (!pedido) {
      return {
        success: false,
        itens_processados: 0,
        error: 'Pedido não encontrado'
      };
    }

    // 2. Validar: não processado
    if (pedido.estoque_baixado) {
      return {
        success: false,
        itens_processados: 0,
        error: 'Este pedido já foi processado e o estoque já foi descontado'
      };
    }

    // 3. Validar: tem loja
    if (!pedido.loja_id) {
      return {
        success: false,
        itens_processados: 0,
        error: 'Pedido não possui loja definida'
      };
    }

    const lojaPedido = pedido.loja_id;
    const produtosCriados: ProdutoCriado[] = [];
    const itensSemEstoque: ItemSemEstoque[] = [];
    const itensParaProcessar: Array<{
      item: any;
      produto_id: number;
      quantidade: number;
      resultado_busca: any;
    }> = [];

    // 4. Para cada item: criar produto se necessário e buscar estoque
    for (const item of pedido.itens) {
      let produtoId = item.produto_id;

      // Criar produto se não existir
      if (!produtoId && item.codigo_produto_tiny) {
        produtoId = await criarOuBuscarProduto(
          {
            codigo: item.codigo_produto_tiny,
            descricao: item.descricao || undefined,
            valor_unitario: Number(item.valor_unitario)
          },
          lojaPedido
        );

        if (produtoId) {
          // Atualizar item com produto_id
          await prisma.itens_pedido.update({
            where: { id: item.id },
            data: { produto_id: produtoId }
          });

          produtosCriados.push({
            produto_id: produtoId,
            codigo: item.codigo_produto_tiny,
            descricao: item.descricao || 'Sem descrição'
          });
        }
      }

      // Se ainda não tem produto_id (sem código), pular item
      if (!produtoId) {
        console.warn(`Item ${item.id} não tem código, não pode ser processado`);
        continue;
      }

      // Buscar estoque disponível (loja do pedido + outras lojas)
      const resultadoBusca = await buscarEstoqueDisponivel(
        produtoId,
        Number(item.quantidade),
        lojaPedido
      );

      if (!resultadoBusca.pode_atender) {
        // Não tem estoque suficiente em nenhuma loja
        itensSemEstoque.push({
          item_id: item.id,
          descricao: item.descricao || 'Sem descrição',
          quantidade_necessaria: Number(item.quantidade),
          total_disponivel: resultadoBusca.total_disponivel,
          lojas_com_estoque: resultadoBusca.lojas_para_descontar
        });
      } else {
        // Tem estoque, adicionar à lista para processar
        itensParaProcessar.push({
          item,
          produto_id: produtoId,
          quantidade: Number(item.quantidade),
          resultado_busca: resultadoBusca
        });
      }
    }

    // 5. Se algum item não tem estoque, NÃO PROCESSAR
    if (itensSemEstoque.length > 0) {
      return {
        success: false,
        itens_processados: 0,
        produtos_criados: produtosCriados.length > 0 ? produtosCriados : undefined,
        itens_sem_estoque: itensSemEstoque,
        error: 'Estoque insuficiente para processar o pedido'
      };
    }

    // 6. Se tudo OK, processar em transação
    await prisma.$transaction(async (tx) => {
      // Descontar estoque de cada loja necessária
      for (const itemProcessar of itensParaProcessar) {
        const { produto_id, resultado_busca } = itemProcessar;

        // Descontar de cada loja que será usada
        for (const lojaDesconto of resultado_busca.lojas_para_descontar) {
          // Buscar estoque atual
          const estoqueAtual = await tx.estoque_loja.findUnique({
            where: {
              produto_id_loja_id: {
                produto_id: produto_id,
                loja_id: lojaDesconto.loja_id
              }
            }
          });

          if (!estoqueAtual) {
            throw new Error(`Estoque não encontrado para produto ${produto_id} na loja ${lojaDesconto.loja_id}`);
          }

          const quantidadeEstoqueAtual = Number(estoqueAtual.quantidade_estoque) || 0;
          const quantidadeDisponivelAtual = Number(estoqueAtual.quantidade_disponivel) || 0;
          const quantidadeDescontar = Number(lojaDesconto.quantidade);

          // Atualizar estoque
          await tx.estoque_loja.update({
            where: {
              produto_id_loja_id: {
                produto_id: produto_id,
                loja_id: lojaDesconto.loja_id
              }
            },
            data: {
              quantidade_estoque: quantidadeEstoqueAtual - quantidadeDescontar,
              quantidade_disponivel: quantidadeDisponivelAtual - quantidadeDescontar,
            }
          });
        }
      }

      // Marcar pedido como processado
      await tx.pedidos.update({
        where: { id: pedidoId },
        data: {
          estoque_baixado: true,
          estoque_baixado_em: new Date(),
          status: 'processado',
          situacao: 'Processado'
        }
      });
    });

    // 7. Preparar resposta com detalhes
    const resumoLojas = itensParaProcessar.reduce((acc, item) => {
      item.resultado_busca.lojas_para_descontar.forEach(loja => {
        if (!acc[loja.loja_id]) {
          acc[loja.loja_id] = 0;
        }
        acc[loja.loja_id] += loja.quantidade;
      });
      return acc;
    }, {} as Record<number, number>);

    const primeiraLojaUsada = itensParaProcessar[0]?.resultado_busca.lojas_para_descontar[0]?.loja_id;
    const observacao = primeiraLojaUsada && primeiraLojaUsada !== lojaPedido
      ? 'Alguns itens foram descontados de outras lojas devido à falta de estoque na loja do pedido'
      : undefined;

    return {
      success: true,
      produtos_criados: produtosCriados.length > 0 ? produtosCriados : undefined,
      estoque_descontado_de: Object.entries(resumoLojas).map(([loja_id, quantidade]) => ({
        loja_id: parseInt(loja_id),
        quantidade_total: quantidade
      })),
      itens_processados: itensParaProcessar.length,
      observacao
    };
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    return {
      success: false,
      itens_processados: 0,
      error: error instanceof Error ? error.message : 'Erro ao processar pedido'
    };
  }
}

