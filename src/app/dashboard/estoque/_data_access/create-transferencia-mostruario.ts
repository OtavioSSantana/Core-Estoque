import prisma from "@/lib/prisma";
import { TIPO_MOVIMENTO } from "../_constants/tipo-movimento";

export interface CreateTransferenciaMostruarioData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
  tipo_movimento: typeof TIPO_MOVIMENTO.ENVIAR_MOSTRUARIO | typeof TIPO_MOVIMENTO.RETORNAR_MOSTRUARIO;
}

export async function createTransferenciaMostruario(data: CreateTransferenciaMostruarioData) {
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
    const quantidadeMostruarioAtual = estoqueAtual.quantidade_mostruario || 0;
    const quantidadeDisponivelAtual = estoqueAtual.quantidade_disponivel || 0;

    let novaQuantidadeEstoque: number;
    let novaQuantidadeMostruario: number;
    let novaQuantidadeDisponivel: number;

    if (data.tipo_movimento === TIPO_MOVIMENTO.ENVIAR_MOSTRUARIO) {
      // Estoque → Mostruário
      if (quantidadeDisponivelAtual < data.quantidade) {
        throw new Error(`Estoque disponível insuficiente. Disponível: ${quantidadeDisponivelAtual}`);
      }
      novaQuantidadeEstoque = quantidadeEstoqueAtual - data.quantidade;
      novaQuantidadeMostruario = quantidadeMostruarioAtual + data.quantidade;
      novaQuantidadeDisponivel = quantidadeDisponivelAtual - data.quantidade; // Diminui disponível
    } else {
      // Mostruário → Estoque
      if (quantidadeMostruarioAtual < data.quantidade) {
        throw new Error(`Mostruário insuficiente. Disponível: ${quantidadeMostruarioAtual}`);
      }
      novaQuantidadeEstoque = quantidadeEstoqueAtual + data.quantidade;
      novaQuantidadeMostruario = quantidadeMostruarioAtual - data.quantidade;
      novaQuantidadeDisponivel = quantidadeDisponivelAtual + data.quantidade; // Aumenta disponível
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
        quantidade_estoque: novaQuantidadeEstoque,
        quantidade_mostruario: novaQuantidadeMostruario,
        quantidade_disponivel: novaQuantidadeDisponivel,
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
    console.log("Erro ao transferir mostruário:", err);
    throw err;
  }
}

