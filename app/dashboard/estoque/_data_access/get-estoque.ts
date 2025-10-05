// app/dashboard/estoque/_data_access/get-estoque.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para dados de estoque com informações do produto
 */
export interface EstoqueItem {
  id: number;
  codigo: string;
  descricao: string;
  fornecedor: string;
  quantidade_estoque: number;
  quantidade_mostruario: number;
  quantidade_disponivel: number;
  preco_venda: string | number;
  total_valor_estoque: number;
  status_estoque: 'baixo' | 'normal' | 'alto' | 'disponível' | 'mostruário' | 'em_trânsito' | 'vendido' | 'reservado';
  loja_id: number | string;
  data_entrada: Date | string;
  barcode?: string;
  notas?: string;
  produto_id?: string | number;
  produto?: {
    nome: string;
    sku: string;
  };
  loja?: {
    id: number | string;
    nome: string;
  };
}

/**
 * Interface para movimentações de estoque
 */
export interface MovimentacaoEstoque {
  id: number;
  produto_id: number;
  quantidade: number;
  data_entrada: Date;
  tipo_entrada: number;
  produtos: {
    codigo: string;
    descricao: string;
  } | null;
}

/**
 * Função para buscar todos os produtos com informações de estoque
 * @returns Promise<NextResponse> - Lista de produtos com estoque ou erro
 */
export async function getEstoque() {
  try {
    // Busca todos os produtos e faz LEFT JOIN com estoque_loja
    const produtos = await prisma.produtos.findMany({
      orderBy: { descricao: 'asc' },
      include: {
        estoque_por_loja: {
          include: {
            loja_ref: {
              select: { id: true, nome: true }
            }
          }
        }
      }
    });

    // Expande produtos com estoque_loja: se não tem estoque_loja, mostra com loja null
    const estoqueComCalculos: any[] = [];
    
    produtos.forEach(produto => {
      if (produto.estoque_por_loja && produto.estoque_por_loja.length > 0) {
        // Produto tem estoque em lojas específicas
        produto.estoque_por_loja.forEach(estoque => {
          const quantidadeEstoque = estoque.quantidade_estoque ?? 0;
          const valorUnitario = parseFloat(produto.preco_venda.toString());
          const totalValorEstoque = quantidadeEstoque * valorUnitario;
          
          estoqueComCalculos.push({
            id: produto.id,
            codigo: produto.codigo,
            descricao: produto.descricao || '',
            fornecedor: produto.fornecedor || '',
            quantidade_estoque: estoque.quantidade_estoque ?? 0,
            quantidade_mostruario: estoque.quantidade_mostruario ?? 0,
            quantidade_disponivel: estoque.quantidade_disponivel ?? 0,
            preco_venda: produto.preco_venda.toString(),
            total_valor_estoque: totalValorEstoque,
            loja_id: estoque.loja_id,
            loja: estoque.loja_ref,
            data_entrada: undefined,
          });
        });
      } else {
        // Produto não tem estoque_loja - mostra com loja null
        const quantidadeEstoque = produto.quantidade_estoque ?? 0;
        const valorUnitario = parseFloat(produto.preco_venda.toString());
        const totalValorEstoque = quantidadeEstoque * valorUnitario;
        
        estoqueComCalculos.push({
          id: produto.id,
          codigo: produto.codigo,
          descricao: produto.descricao || '',
          fornecedor: produto.fornecedor || '',
          quantidade_estoque: produto.quantidade_estoque ?? 0,
          quantidade_mostruario: produto.quantidade_mostruario ?? 0,
          quantidade_disponivel: produto.quantidade_disponivel ?? 0,
          preco_venda: produto.preco_venda.toString(),
          total_valor_estoque: totalValorEstoque,
          loja_id: null,
          loja: null,
          data_entrada: undefined,
        });
      }
    });

    return NextResponse.json(estoqueComCalculos, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar estoque." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar movimentações de entrada de estoque
 * @returns Promise<NextResponse> - Lista de movimentações ou erro
 */
export async function getMovimentacoesEstoque() {
  try {
    const movimentacoes = await prisma.entrada_estoque.findMany({
      orderBy: {
        data_entrada: 'desc',
      },
      include: {
        produtos: {
          select: {
            codigo: true,
            descricao: true,
          }
        }
      }
    });

    return NextResponse.json(movimentacoes, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar movimentações de estoque:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar movimentações." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar estoque baixo (produtos com quantidade <= 5)
 * @returns Promise<NextResponse> - Lista de produtos com estoque baixo
 */
export async function getEstoqueBaixo() {
  try {
    const produtosEstoqueBaixo = await prisma.produtos.findMany({
      where: {
        quantidade_estoque: {
          lte: 5
        }
      },
      orderBy: {
        quantidade_estoque: 'asc',
      },
      select: {
        id: true,
        codigo: true,
        descricao: true,
        fornecedor: true,
        quantidade_estoque: true,
        quantidade_mostruario: true,
        quantidade_disponivel: true,
        preco_venda: true,
      }
    });

    return NextResponse.json(produtosEstoqueBaixo, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar estoque baixo:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar estoque baixo." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar resumo do estoque (totais e estatísticas)
 * @returns Promise<NextResponse> - Resumo do estoque
 */
export async function getResumoEstoque() {
  try {
    const produtos = await prisma.produtos.findMany({
      select: {
        quantidade_estoque: true,
        quantidade_mostruario: true,
        quantidade_disponivel: true,
        preco_venda: true,
      }
    });

    // Calcula estatísticas
    const totalProdutos = produtos.length;
    const totalEstoque = produtos.reduce((sum, p) => sum + (p.quantidade_estoque || 0), 0);
    const totalMostruario = produtos.reduce((sum, p) => sum + (p.quantidade_mostruario || 0), 0);
    const totalDisponivel = produtos.reduce((sum, p) => sum + (p.quantidade_disponivel || 0), 0);
    const totalValorEstoque = produtos.reduce((sum, p) => {
      return sum + ((p.quantidade_estoque || 0) * parseFloat(p.preco_venda.toString()));
    }, 0);

    const estoqueBaixo = produtos.filter(p => (p.quantidade_estoque || 0) <= 5).length;
    const estoqueNormal = produtos.filter(p => (p.quantidade_estoque || 0) > 5 && (p.quantidade_estoque || 0) < 20).length;
    const estoqueAlto = produtos.filter(p => (p.quantidade_estoque || 0) >= 20).length;

    const resumo = {
      total_produtos: totalProdutos,
      total_estoque: totalEstoque,
      total_mostruario: totalMostruario,
      total_disponivel: totalDisponivel,
      total_valor_estoque: totalValorEstoque,
      estoque_baixo: estoqueBaixo,
      estoque_normal: estoqueNormal,
      estoque_alto: estoqueAlto,
      percentual_estoque_baixo: totalProdutos > 0 ? ((estoqueBaixo / totalProdutos) * 100).toFixed(1) : '0'
    };

    return NextResponse.json(resumo, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar resumo do estoque:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar resumo do estoque." },
      { status: 500 }
    );
  }
}
