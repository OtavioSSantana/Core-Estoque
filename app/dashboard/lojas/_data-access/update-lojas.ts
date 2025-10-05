// app/dashboard/lojas/_data_access/update-lojas.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para os dados de atualização de loja
 */
export interface UpdateLojaData {
  nome?: string;
  endereco?: string;
  gerente?: number;
}

/**
 * Função para atualizar uma loja existente
 * @param id - ID da loja a ser atualizada
 * @param data - Dados da loja a serem atualizados
 * @returns Promise<NextResponse> - Loja atualizada ou erro
 */
export async function updateLoja(id: number, data: UpdateLojaData) {
  try {
    // Verifica se a loja existe
    const lojaExistente = await prisma.lojas.findUnique({
      where: { id }
    });

    if (!lojaExistente) {
      return NextResponse.json(
        { message: "Loja não encontrada" },
        { status: 404 }
      );
    }

    // Se nome foi informado, verifica se já existe outra loja com o mesmo nome
    if (data.nome && data.nome.trim() !== lojaExistente.nome) {
      const lojaComMesmoNome = await prisma.lojas.findFirst({
        where: {
          nome: {
            equals: data.nome.trim(),
            mode: 'insensitive'
          },
          id: {
            not: id
          }
        }
      });

      if (lojaComMesmoNome) {
        return NextResponse.json(
          { message: "Já existe uma loja com este nome" },
          { status: 409 }
        );
      }
    }

    // Se gerente foi informado, verifica se existe
    if (data.gerente) {
      const gerenteExiste = await prisma.usuarios.findUnique({
        where: { id: data.gerente }
      });

      if (!gerenteExiste) {
        return NextResponse.json(
          { message: "Gerente não encontrado" },
          { status: 404 }
        );
      }
    }

    // Prepara os dados para atualização
    const dadosAtualizacao: any = {};
    
    if (data.nome !== undefined) {
      dadosAtualizacao.nome = data.nome.trim();
    }
    
    if (data.endereco !== undefined) {
      dadosAtualizacao.endereco = data.endereco?.trim() || null;
    }
    
    if (data.gerente !== undefined) {
      dadosAtualizacao.gerente = data.gerente || null;
    }

    // Atualiza a loja
    const lojaAtualizada = await prisma.lojas.update({
      where: { id },
      data: dadosAtualizacao
    });

    return NextResponse.json(lojaAtualizada, { status: 200 });

  } catch (error) {
    console.error("Erro ao atualizar loja:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao atualizar loja." },
      { status: 500 }
    );
  }
}

/**
 * Função para validar dados de atualização de loja
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateUpdateLojaData(data: UpdateLojaData): string[] {
  const errors: string[] = [];

  if (data.nome !== undefined) {
    if (!data.nome?.trim()) {
      errors.push("Nome da loja é obrigatório");
    } else if (data.nome.trim().length > 80) {
      errors.push("Nome da loja deve ter no máximo 80 caracteres");
    }
  }

  if (data.gerente !== undefined && data.gerente && (!Number.isInteger(data.gerente) || data.gerente <= 0)) {
    errors.push("ID do gerente deve ser um número inteiro positivo");
  }

  return errors;
}
