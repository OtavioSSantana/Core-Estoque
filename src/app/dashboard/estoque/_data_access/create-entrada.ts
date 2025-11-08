import prisma from "@/lib/prisma";

export interface CreateEntradaData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
  fornecedor_id?: number;
}

export async function createEntrada(data: CreateEntradaData) {
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

    // Buscar ou criar estoque_loja
    const estoqueAtual = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      }
    });

    const quantidadeEstoqueAtual = estoqueAtual?.quantidade_estoque || 0;
    const quantidadeDisponivelAtual = estoqueAtual?.quantidade_disponivel || 0;

    // Atualizar ou criar estoque_loja
    const estoqueAtualizado = await prisma.estoque_loja.upsert({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      },
      update: {
        quantidade_estoque: quantidadeEstoqueAtual + data.quantidade,
        quantidade_disponivel: quantidadeDisponivelAtual + data.quantidade,
      },
      create: {
        produto_id: data.produto_id,
        loja_id: data.loja_id,
        quantidade_estoque: data.quantidade,
        quantidade_disponivel: data.quantidade,
        quantidade_mostruario: 0,
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
    console.log("Erro ao criar entrada:", err);
    throw err;
  }
}

