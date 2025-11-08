// app/dashboard/lojas/_data_access/create-lojas.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para os dados de criação de loja
 */
export interface CreateLojaData {
  nome: string;
  endereco?: string;
  gerente?: number;
}

/**
 * Função para criar uma nova loja
 * @param data - Dados da loja a ser criada
 * @returns Promise<NextResponse> - Loja criada ou erro
 */
export async function createLoja(data: CreateLojaData) {
  try {
    // Valida os campos obrigatórios
    const { nome, endereco, gerente } = data;
    
    if (!nome?.trim()) {
      return NextResponse.json(
        { message: "Nome da loja é obrigatório" },
        { status: 400 }
      );
    }

    // Verifica se já existe uma loja com o mesmo nome
    const lojaExistente = await prisma.lojas.findFirst({
      where: {
        nome: {
          equals: nome.trim(),
          mode: 'insensitive'
        }
      }
    });

    if (lojaExistente) {
      return NextResponse.json(
        { message: "Já existe uma loja com este nome" },
        { status: 409 }
      );
    }

    // Se gerente foi informado, verifica se existe
    if (gerente) {
      const gerenteExiste = await prisma.usuarios.findUnique({
        where: { id: gerente }
      });

      if (!gerenteExiste) {
        return NextResponse.json(
          { message: "Gerente não encontrado" },
          { status: 404 }
        );
      }
    }

    // Cria a nova loja
    const novaLoja = await prisma.lojas.create({
      data: {
        nome: nome.trim(),
        endereco: endereco?.trim() || null,
        gerente: gerente || null,
        qtd_total_prod: 0,
      }
    });

    // Retorna a loja criada com status 201 (Created)
    return NextResponse.json(novaLoja, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar loja:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao criar loja." },
      { status: 500 }
    );
  }
}

/**
 * Função para validar dados de criação de loja
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateCreateLojaData(data: CreateLojaData): string[] {
  const errors: string[] = [];

  if (!data.nome?.trim()) {
    errors.push("Nome da loja é obrigatório");
  } else if (data.nome.trim().length > 80) {
    errors.push("Nome da loja deve ter no máximo 80 caracteres");
  }

  if (data.gerente && (!Number.isInteger(data.gerente) || data.gerente <= 0)) {
    errors.push("ID do gerente deve ser um número inteiro positivo");
  }

  return errors;
}
