// app/dashboard/lojas/_data_access/delete-lojas.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Função para deletar uma loja
 * @param id - ID da loja a ser deletada
 * @returns Promise<NextResponse> - Confirmação de exclusão ou erro
 */
export async function deleteLoja(id: number) {
  try {
    // Verifica se a loja existe
    const lojaExistente = await prisma.lojas.findUnique({
      where: { id },
      include: {
        estoque_por_loja: true
      }
    });

    if (!lojaExistente) {
      return NextResponse.json(
        { message: "Loja não encontrada" },
        { status: 404 }
      );
    }

    // Verifica se a loja tem produtos em estoque
    if (lojaExistente.estoque_por_loja.length > 0) {
      return NextResponse.json(
        { message: "Não é possível deletar uma loja que possui produtos em estoque" },
        { status: 400 }
      );
    }

    // Verifica se há estoque relacionado a esta loja
    // (não há mais tabela entrada_estoque, apenas estoque_loja)

    // Deleta a loja
    await prisma.lojas.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Loja deletada com sucesso" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao deletar loja:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao deletar loja." },
      { status: 500 }
    );
  }
}

/**
 * Função para verificar se uma loja pode ser deletada
 * @param id - ID da loja
 * @returns Promise<boolean> - true se pode ser deletada, false caso contrário
 */
export async function canDeleteLoja(id: number): Promise<boolean> {
  try {
    const loja = await prisma.lojas.findUnique({
      where: { id },
      include: {
        estoque_por_loja: true
      }
    });

    if (!loja) {
      return false;
    }

    // Verifica se tem produtos em estoque
    if (loja.estoque_por_loja.length > 0) {
      return false;
    }

    // Não há mais tabela entrada_estoque, apenas verifica estoque_por_loja
    return true;

  } catch (error) {
    console.error("Erro ao verificar se loja pode ser deletada:", error);
    return false;
  }
}

/**
 * Função para validar ID da loja
 * @param id - ID a ser validado
 * @returns string[] - Array de erros encontrados
 */
export function validateLojaId(id: string | number): string[] {
  const errors: string[] = [];

  if (!id) {
    errors.push("ID da loja é obrigatório");
  } else if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    errors.push("ID da loja deve ser um número inteiro positivo");
  }

  return errors;
}
