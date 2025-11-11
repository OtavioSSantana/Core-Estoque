import prisma from '@/lib/prisma';

export interface ItemTiny {
  codigo?: string;
  descricao?: string;
  valor_unitario?: number;
}

/**
 * Cria ou busca produto baseado no item do pedido Tiny
 * Se não existir, cria automaticamente
 * 
 * @param item - Item do pedido com informações do produto
 * @param lojaId - ID da loja para criar registro de estoque
 * @returns ID do produto ou null se não foi possível criar
 */
export async function criarOuBuscarProduto(
  item: ItemTiny,
  lojaId: number
): Promise<number | null> {
  try {
    // Se não tem código, não podemos criar produto
    if (!item.codigo || !item.codigo.trim()) {
      console.warn('Item sem código, não é possível criar produto:', item.descricao);
      return null;
    }
    
    const codigo = item.codigo.trim();
    
    // 1. Tentar buscar produto existente pelo código
    let produto = await prisma.produtos.findUnique({
      where: { codigo }
    });
    
    // 2. Se não existe, criar automaticamente
    if (!produto) {
      console.log(`📦 Criando produto automaticamente: ${codigo} - ${item.descricao}`);
      
      // Gerar código único se necessário (caso código seja muito longo)
      let codigoFinal = codigo;
      if (codigo.length > 60) {
        // Se código excede limite, truncar
        codigoFinal = codigo.substring(0, 57) + '...';
      }
      
      // Criar produto com dados do item
      produto = await prisma.produtos.create({
        data: {
          codigo: codigoFinal,
          descricao: item.descricao?.trim() || `Produto ${codigo}`,
          fornecedor: 'Importado do Tiny',
          preco_venda: item.valor_unitario || 0,
        }
      });
      
      console.log(`✅ Produto criado: ID ${produto.id}, Código: ${codigoFinal}`);
    }
    
    // 3. Garantir que existe estoque_loja para este produto nesta loja
    const estoque = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: produto.id,
          loja_id: lojaId
        }
      }
    });
    
    // Se não existe registro de estoque, criar com quantidade 0
    if (!estoque) {
      await prisma.estoque_loja.create({
        data: {
          produto_id: produto.id,
          loja_id: lojaId,
          quantidade_estoque: 0,
          quantidade_mostruario: 0,
          quantidade_disponivel: 0,
        }
      });
    }
    
    return produto.id;
  } catch (error) {
    console.error('Erro ao criar ou buscar produto:', error);
    return null;
  }
}

