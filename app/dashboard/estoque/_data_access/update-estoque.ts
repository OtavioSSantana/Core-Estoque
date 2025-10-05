// app/dashboard/estoque/_data_access/update-estoque.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para dados de atualização de estoque
 */
export interface UpdateEstoqueData {
  produto_id: string | number;
  quantidade_estoque?: string | number;
  quantidade_mostruario?: string | number;
  quantidade_disponivel?: string | number;
  quantidade?: number;
  tipo_movimentacao?: 'transfer' | 'add' | 'remove' | 'toShowcase' | 'toStock' | 'transfer_between_stores';
  loja_id?: number; // legado: mover produto de loja (não recomendado)
  loja_origem?: number;
  loja_destino?: number;
  observacao?: string;
}

/**
 * Função para atualizar quantidades de estoque de um produto
 * @param data - Dados de estoque a serem atualizados
 * @returns Promise<any> - Resposta da API
 */
export async function updateEstoque(data: UpdateEstoqueData) {
  try {
    // Roteia conforme o tipo de movimentação
    if (data.tipo_movimentacao === 'toShowcase') {
      // mover do estoque para o mostruário
      const resp = await fetch('/api/estoque/saidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: data.produto_id,
          quantidade: data.quantidade || 1,
          tipo: 'transferencia',
          tipo_transferencia: 'estoque_para_mostruario',
        }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Erro ao mover para mostruário');
      }
      return await resp.json();
    }

    if (data.tipo_movimentacao === 'toStock') {
      // mover do mostruário para o estoque
      const resp = await fetch('/api/estoque/saidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: data.produto_id,
          quantidade: data.quantidade || 1,
          tipo: 'transferencia',
          tipo_transferencia: 'mostruario_para_estoque',
        }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Erro ao mover para estoque');
      }
      return await resp.json();
    }

    if (data.tipo_movimentacao === 'add') {
      // entrada (ajuste positivo)
      const resp = await fetch('/api/estoque/ajustes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: data.produto_id,
          quantidade_ajuste: data.quantidade || 1,
          tipo_ajuste: 'entrada',
          motivo: data.observacao,
        }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Erro ao adicionar estoque');
      }
      return await resp.json();
    }

    if (data.tipo_movimentacao === 'remove') {
      // saída (ajuste negativo)
      const resp = await fetch('/api/estoque/ajustes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: data.produto_id,
          quantidade_ajuste: data.quantidade || 1,
          tipo_ajuste: 'saida',
          motivo: data.observacao,
        }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Erro ao remover estoque');
      }
      return await resp.json();
    }

    if (data.tipo_movimentacao === 'transfer' || data.tipo_movimentacao === 'transfer_between_stores') {
      // transferência entre lojas operando em estoque_loja
      const origem = data.loja_origem;
      const destino = data.loja_destino;
      if (origem == null || destino == null) {
        throw new Error('Informe loja_origem e loja_destino');
      }
      if (parseInt(origem as any) === parseInt(destino as any)) {
        throw new Error('loja_origem e loja_destino devem ser diferentes');
      }
      const resp = await fetch('/api/estoque/transferencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: data.produto_id,
          quantidade: data.quantidade || 1,
          loja_origem: origem,
          loja_destino: destino,
        }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Erro ao transferir entre lojas');
      }
      return await resp.json();
    }

    // fallback: atualização direta de campos suportados pelo endpoint PUT /api/estoque
    const response = await fetch('/api/estoque', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao atualizar estoque');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error);
    throw error;
  }
}

/**
 * Função para ajustar estoque (adicionar ou remover quantidade)
 * @param data - Dados do ajuste
 * @returns Promise<NextResponse> - Resposta da API
 */
export async function ajustarEstoque(data: {
  produto_id: string | number;
  quantidade_ajuste: string | number;
  tipo_ajuste: 'entrada' | 'saida';
  motivo?: string;
}) {
  try {
    const response = await fetch('/api/estoque/ajustes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao ajustar estoque');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao ajustar estoque:', error);
    throw error;
  }
}

/**
 * Função para validar dados de atualização de estoque
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateUpdateEstoqueData(data: UpdateEstoqueData): string[] {
  const errors: string[] = [];

  if (!data.produto_id) {
    errors.push('ID do produto é obrigatório');
  } else if (isNaN(parseInt(data.produto_id.toString()))) {
    errors.push("ID do produto deve ser um número válido");
  }

  if (data.quantidade_estoque !== undefined && isNaN(parseInt(data.quantidade_estoque.toString()))) {
    errors.push("Quantidade de estoque deve ser um número válido");
  }

  if (data.quantidade_mostruario !== undefined && isNaN(parseInt(data.quantidade_mostruario.toString()))) {
    errors.push("Quantidade de mostruário deve ser um número válido");
  }

  if (data.quantidade_disponivel !== undefined && isNaN(parseInt(data.quantidade_disponivel.toString()))) {
    errors.push("Quantidade disponível deve ser um número válido");
  }

  return errors;
}
