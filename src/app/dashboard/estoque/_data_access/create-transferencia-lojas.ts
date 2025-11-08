import prisma from "@/lib/prisma";

export interface CreateTransferenciaLojasData {
  produto_id: number;
  quantidade: number;
  loja_origem: number;
  loja_destino: number;
}

export async function createTransferenciaLojas(data: CreateTransferenciaLojasData) {
  if (!data.produto_id || !data.quantidade || !data.loja_origem || !data.loja_destino) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_origem, loja_destino");
  }

  if (data.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  if (data.loja_origem === data.loja_destino) {
    throw new Error("A loja origem deve ser diferente da loja destino");
  }

  try {
    // Verificar se produto existe
    const produto = await prisma.produtos.findUnique({
      where: { id: data.produto_id }
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se lojas existem
    const [lojaOrigem, lojaDestino] = await Promise.all([
      prisma.lojas.findUnique({ where: { id: data.loja_origem } }),
      prisma.lojas.findUnique({ where: { id: data.loja_destino } })
    ]);

    if (!lojaOrigem) {
      throw new Error("Loja origem não encontrada");
    }

    if (!lojaDestino) {
      throw new Error("Loja destino não encontrada");
    }

    // Buscar estoque na loja origem
    const estoqueOrigem = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_origem
        }
      }
    });

    if (!estoqueOrigem) {
      throw new Error("Produto não possui estoque na loja origem");
    }

    const quantidadeDisponivelOrigem = estoqueOrigem.quantidade_disponivel || 0;

    if (quantidadeDisponivelOrigem < data.quantidade) {
      throw new Error(`Estoque insuficiente na loja origem. Disponível: ${quantidadeDisponivelOrigem}`);
    }

    // Buscar ou criar estoque na loja destino
    const estoqueDestino = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_destino
        }
      }
    });

    const quantidadeEstoqueOrigem = estoqueOrigem.quantidade_estoque || 0;
    const quantidadeDisponivelOrigemAtual = estoqueOrigem.quantidade_disponivel || 0;

    const quantidadeEstoqueDestino = estoqueDestino?.quantidade_estoque || 0;
    const quantidadeDisponivelDestino = estoqueDestino?.quantidade_disponivel || 0;

    // Executar transferência em transação
    const [estoqueOrigemAtualizado, estoqueDestinoAtualizado] = await prisma.$transaction([
      // Diminuir da loja origem
      prisma.estoque_loja.update({
        where: {
          produto_id_loja_id: {
            produto_id: data.produto_id,
            loja_id: data.loja_origem
          }
        },
        data: {
          quantidade_estoque: quantidadeEstoqueOrigem - data.quantidade,
          quantidade_disponivel: quantidadeDisponivelOrigemAtual - data.quantidade,
        }
      }),
      // Aumentar na loja destino
      prisma.estoque_loja.upsert({
        where: {
          produto_id_loja_id: {
            produto_id: data.produto_id,
            loja_id: data.loja_destino
          }
        },
        update: {
          quantidade_estoque: quantidadeEstoqueDestino + data.quantidade,
          quantidade_disponivel: quantidadeDisponivelDestino + data.quantidade,
        },
        create: {
          produto_id: data.produto_id,
          loja_id: data.loja_destino,
          quantidade_estoque: data.quantidade,
          quantidade_disponivel: data.quantidade,
          quantidade_mostruario: 0,
        }
      })
    ]);

    return {
      estoque_origem: estoqueOrigemAtualizado,
      estoque_destino: estoqueDestinoAtualizado,
      produto: {
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao
      }
    };
  } catch (err) {
    console.log("Erro ao transferir entre lojas:", err);
    throw err;
  }
}

