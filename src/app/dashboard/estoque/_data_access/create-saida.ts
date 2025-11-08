import prisma from "@/lib/prisma";

export interface CreateSaidaData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
}

export async function createSaida(data: CreateSaidaData) {
  if (!data.produto_id || !data.quantidade || !data.loja_id) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_id");
  }

  if (data.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  try {
    // Verificar se produto existe
    const produto = await prisma.produtos.findUnique({
      where: { id: data.produto_id }
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se loja existe
    const loja = await prisma.lojas.findUnique({
      where: { id: data.loja_id }
    });

    if (!loja) {
      throw new Error("Loja não encontrada");
    }

    // Buscar estoque atual
    const estoqueAtual = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      }
    });

    if (!estoqueAtual) {
      throw new Error("Produto não possui estoque nesta loja");
    }

    const quantidadeEstoqueAtual = estoqueAtual.quantidade_estoque || 0;
    const quantidadeDisponivelAtual = estoqueAtual.quantidade_disponivel || 0;

    // Verificar se tem estoque suficiente
    if (quantidadeDisponivelAtual < data.quantidade) {
      throw new Error(`Estoque insuficiente. Disponível: ${quantidadeDisponivelAtual}`);
    }

    // Atualizar estoque
    const estoqueAtualizado = await prisma.estoque_loja.update({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      },
      data: {
        quantidade_estoque: quantidadeEstoqueAtual - data.quantidade,
        quantidade_disponivel: quantidadeDisponivelAtual - data.quantidade,
      }
    });

    return {
      estoque: estoqueAtualizado,
      produto: {
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao
      }
    };
  } catch (err) {
    console.log("Erro ao criar saída:", err);
    throw err;
  }
}

