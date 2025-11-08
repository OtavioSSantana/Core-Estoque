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
  loja_id: number | string | null;
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

    // Expande produtos: retorna TODOS os produtos, com ou sem estoque_loja
    const estoqueComCalculos: Array<{
      id: number;
      codigo: string;
      descricao: string;
      fornecedor: string;
      quantidade_estoque: number;
      quantidade_mostruario: number;
      quantidade_disponivel: number;
      preco_venda: string;
      total_valor_estoque: number;
      loja_id: number | null;
      loja: { id: number; nome: string | null } | null;
      data_entrada: undefined;
      status_estoque: 'baixo' | 'normal' | 'alto';
      barcode?: string;
      produto?: {
        nome: string;
        sku: string;
      };
    }> = [];
    
    produtos.forEach(produto => {
      if (produto.estoque_por_loja && produto.estoque_por_loja.length > 0) {
        // Produto tem estoque em lojas específicas - retorna uma linha por loja
        produto.estoque_por_loja.forEach(estoque => {
          const quantidadeEstoque = estoque.quantidade_estoque ?? 0;
          const quantidadeDisponivel = estoque.quantidade_disponivel ?? 0;
          const valorUnitario = parseFloat(produto.preco_venda.toString());
          const totalValorEstoque = quantidadeEstoque * valorUnitario;
          
          // Determina status do estoque
          let status_estoque: 'baixo' | 'normal' | 'alto' = 'normal';
          if (quantidadeDisponivel <= 5) {
            status_estoque = 'baixo';
          } else if (quantidadeDisponivel >= 20) {
            status_estoque = 'alto';
          }
          
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
            status_estoque,
            barcode: produto.codigo,
            produto: {
              nome: produto.descricao || produto.codigo,
              sku: produto.codigo
            }
          });
        });
      } else {
        // Produto SEM estoque_loja - retorna com valores zerados e loja null
        estoqueComCalculos.push({
          id: produto.id,
          codigo: produto.codigo,
          descricao: produto.descricao || '',
          fornecedor: produto.fornecedor || '',
          quantidade_estoque: 0,
          quantidade_mostruario: 0,
          quantidade_disponivel: 0,
          preco_venda: produto.preco_venda.toString(),
          total_valor_estoque: 0,
          loja_id: null,
          loja: null,
          data_entrada: undefined,
          status_estoque: 'baixo',
          barcode: produto.codigo,
          produto: {
            nome: produto.descricao || produto.codigo,
            sku: produto.codigo
          }
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

