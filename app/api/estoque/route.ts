// app/api/estoque/route.ts

import { NextRequest } from 'next/server';
import { 
  getEstoque, 
  getMovimentacoesEstoque, 
  getEstoqueBaixo, 
  getResumoEstoque 
} from '../../dashboard/estoque/_data_access/get-estoque';
import prisma from '@/lib/prisma';

/**
 * Função para lidar com requisições GET (buscar dados de estoque)
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const tipo = url.searchParams.get('tipo');
    const paginated = url.searchParams.get('paginated') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const search = url.searchParams.get('search')?.trim() || '';
    const status = url.searchParams.get('status'); // 'baixo' | 'normal' | 'alto'
    const lojaId = url.searchParams.get('lojaId');

    switch (tipo) {
      case 'movimentacoes':
        return await getMovimentacoesEstoque();
      
      case 'baixo':
        return await getEstoqueBaixo();
      
      case 'resumo':
        return await getResumoEstoque();
      
      default:
        if (!paginated) {
          return await getEstoque();
        }

        // Busca produtos com estoque_loja (LEFT JOIN)
        const whereProdutos: any = {};
        if (search) {
          whereProdutos.OR = [
            { codigo: { contains: search, mode: 'insensitive' } },
            { descricao: { contains: search, mode: 'insensitive' } },
            { fornecedor: { contains: search, mode: 'insensitive' } },
          ];
        }
        
        const produtos = await prisma.produtos.findMany({
          where: whereProdutos,
          orderBy: { descricao: 'asc' },
          skip: Math.max(0, (page - 1) * pageSize),
          take: Math.max(1, pageSize),
          include: {
            estoque_por_loja: {
              where: lojaId ? { loja_id: parseInt(lojaId) } : {},
              include: {
                loja_ref: {
                  select: { id: true, nome: true }
                }
              }
            }
          }
        });
        const total = await prisma.produtos.count({ where: whereProdutos });

        // Expande produtos com estoque_loja
        let itensCalculados: any[] = [];
        
        produtos.forEach(produto => {
          if (produto.estoque_por_loja && produto.estoque_por_loja.length > 0) {
            // Produto tem estoque em lojas específicas
            produto.estoque_por_loja.forEach(estoque => {
              const quantidadeEstoque = estoque.quantidade_estoque ?? 0;
              itensCalculados.push({
                id: produto.id,
                codigo: produto.codigo,
                descricao: produto.descricao,
                fornecedor: produto.fornecedor,
                quantidade_estoque: estoque.quantidade_estoque,
                quantidade_mostruario: estoque.quantidade_mostruario,
                quantidade_disponivel: estoque.quantidade_disponivel,
                preco_venda: produto.preco_venda.toString(),
                total_valor_estoque: (estoque.quantidade_estoque ?? 0) * parseFloat(produto.preco_venda.toString()),
                loja_id: estoque.loja_id,
                loja: estoque.loja_ref,
                data_entrada: null,
              });
            });
          } else {
            // Produto não tem estoque_loja - mostra com loja null
            const quantidadeEstoque = produto.quantidade_estoque ?? 0;
            itensCalculados.push({
              id: produto.id,
              codigo: produto.codigo,
              descricao: produto.descricao,
              fornecedor: produto.fornecedor,
              quantidade_estoque: produto.quantidade_estoque,
              quantidade_mostruario: produto.quantidade_mostruario,
              quantidade_disponivel: produto.quantidade_disponivel,
              preco_venda: produto.preco_venda.toString(),
              total_valor_estoque: (produto.quantidade_estoque ?? 0) * parseFloat(produto.preco_venda.toString()),
              loja_id: null,
              loja: null,
              data_entrada: null,
            });
          }
        });

        // Remove filtro de status (coluna removida)
        const itensFiltrados = itensCalculados;

        return Response.json(
          {
            items: itensFiltrados,
            meta: {
              page,
              pageSize,
              total,
              totalPages: Math.max(1, Math.ceil(total / Math.max(1, pageSize))),
            },
          },
          { status: 200 }
        );
    }
  } catch (error) {
    console.error("Erro ao processar requisição GET de estoque:", error);
    return Response.json(
      { message: "Erro interno do servidor ao processar requisição." },
      { status: 500 }
    );
  }
}

/**
 * Função para lidar com requisições PUT (atualizar estoque)
 */
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { produto_id } = data;
    
    if (!produto_id) {
      return Response.json(
        { message: "ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    const produtoId = parseInt(produto_id.toString());

    // Verifica se o produto existe
    const produtoExistente = await prisma.produtos.findUnique({
      where: { id: produtoId }
    });

    if (!produtoExistente) {
      return Response.json(
        { message: "Produto não encontrado" },
        { status: 404 }
      );
    }

    // Prepara os dados para atualização
    const updateData: any = {};

    if (data.quantidade_estoque !== undefined) {
      const novaQuantidadeEstoque = parseInt(data.quantidade_estoque.toString());
      if (novaQuantidadeEstoque < 0) {
        return Response.json(
          { message: "Quantidade de estoque não pode ser negativa" },
          { status: 400 }
        );
      }
      updateData.quantidade_estoque = novaQuantidadeEstoque;
    }

    if (data.quantidade_mostruario !== undefined) {
      const novaQuantidadeMostruario = parseInt(data.quantidade_mostruario.toString());
      if (novaQuantidadeMostruario < 0) {
        return Response.json(
          { message: "Quantidade de mostruário não pode ser negativa" },
          { status: 400 }
        );
      }
      updateData.quantidade_mostruario = novaQuantidadeMostruario;
    }

    // Removido: atualização de loja não é mais suportada
    // O estoque por loja é gerenciado apenas pela tabela estoque_loja

    if (data.quantidade_disponivel !== undefined) {
      const novaQuantidadeDisponivel = parseInt(data.quantidade_disponivel.toString());
      if (novaQuantidadeDisponivel < 0) {
        return Response.json(
          { message: "Quantidade disponível não pode ser negativa" },
          { status: 400 }
        );
      }
      updateData.quantidade_disponivel = novaQuantidadeDisponivel;
    }

    // Se não há dados para atualizar
    if (Object.keys(updateData).length === 0) {
      return Response.json(
        { message: "Nenhum campo foi fornecido para atualização" },
        { status: 400 }
      );
    }

    // Atualiza o produto
    const produtoAtualizado = await prisma.produtos.update({
      where: { id: produtoId },
      data: updateData
    });

    return Response.json(produtoAtualizado, { status: 200 });

  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    return Response.json(
      { message: "Erro interno do servidor ao atualizar estoque." },
      { status: 500 }
    );
  }
}
