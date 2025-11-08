import prisma from "@/lib/prisma";

export interface CreateAjusteData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
  direcao: 'positivo' | 'negativo';
  motivo?: string;
}

export async function createAjuste(data: CreateAjusteData) {
  if (!data.produto_id || !data.quantidade || !data.loja_id || !data.direcao) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_id, direcao");
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

    // Buscar ou criar estoque
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

    let novaQuantidadeEstoque: number;
    let novaQuantidadeDisponivel: number;

    if (data.direcao === 'positivo') {
      // Ajuste positivo (aumenta)
      novaQuantidadeEstoque = quantidadeEstoqueAtual + data.quantidade;
      novaQuantidadeDisponivel = quantidadeDisponivelAtual + data.quantidade;
    } else {
      // Ajuste negativo (diminui)
      if (quantidadeDisponivelAtual < data.quantidade) {
        throw new Error(`Estoque insuficiente para ajuste negativo. Disponível: ${quantidadeDisponivelAtual}`);
      }
      novaQuantidadeEstoque = quantidadeEstoqueAtual - data.quantidade;
      novaQuantidadeDisponivel = quantidadeDisponivelAtual - data.quantidade;
    }

    // Atualizar ou criar estoque
    const estoqueAtualizado = await prisma.estoque_loja.upsert({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      },
      update: {
        quantidade_estoque: novaQuantidadeEstoque,
        quantidade_disponivel: novaQuantidadeDisponivel,
      },
      create: {
        produto_id: data.produto_id,
        loja_id: data.loja_id,
        quantidade_estoque: data.direcao === 'positivo' ? data.quantidade : 0,
        quantidade_disponivel: data.direcao === 'positivo' ? data.quantidade : 0,
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
    console.log("Erro ao criar ajuste:", err);
    throw err;
  }
}

