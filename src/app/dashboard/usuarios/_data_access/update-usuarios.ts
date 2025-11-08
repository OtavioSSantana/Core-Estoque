// app/dashboard/usuarios/_data_access/update-usuarios.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para os dados de atualização de usuário
 */
export interface UpdateUsuarioData {
  nome?: string;
  login?: string;
  senha?: number;
  setor?: number;
  loja?: number;
  email?: string;
  inativo?: boolean;
}

/**
 * Função para atualizar um usuário existente
 * @param id - ID do usuário a ser atualizado
 * @param data - Dados do usuário a serem atualizados
 * @returns Promise<NextResponse> - Usuário atualizado ou erro
 */
export async function updateUsuario(id: number, data: UpdateUsuarioData) {
  try {
    // Verifica se o usuário existe
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { id }
    });

    if (!usuarioExistente) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Se login foi informado, verifica se já existe outro usuário com o mesmo login
    if (data.login && data.login.trim() !== usuarioExistente.login) {
      const loginExistente = await prisma.usuarios.findFirst({
        where: {
          login: {
            equals: data.login.trim(),
            mode: 'insensitive'
          },
          id: {
            not: id // Exclui o próprio usuário da verificação
          }
        }
      });

      if (loginExistente) {
        return NextResponse.json(
          { message: "Já existe outro usuário com este login" },
          { status: 409 }
        );
      }
    }

    // Se setor foi informado, verifica se existe
    if (data.setor !== undefined && data.setor !== null) {
      const setorExiste = await prisma.setor.findUnique({
        where: { id: data.setor }
      });

      if (!setorExiste) {
        return NextResponse.json(
          { message: "Setor não encontrado" },
          { status: 404 }
        );
      }
    }

    // Se loja foi informada, verifica se existe
    if (data.loja !== undefined && data.loja !== null) {
      const lojaExiste = await prisma.lojas.findUnique({
        where: { id: data.loja }
      });

      if (!lojaExiste) {
        return NextResponse.json(
          { message: "Loja não encontrada" },
          { status: 404 }
        );
      }
    }

    // Prepara os dados para atualização
    const dadosAtualizacao: Partial<{
      nome: string;
      login: string;
      senha: number;
      setor: number;
      loja: number;
      email: string | null;
      inativo: boolean;
    }> = {};

    if (data.nome !== undefined) {
      dadosAtualizacao.nome = data.nome.trim();
    }

    if (data.login !== undefined) {
      dadosAtualizacao.login = data.login.trim();
    }

    if (data.senha !== undefined) {
      dadosAtualizacao.senha = data.senha;
    }

    if (data.setor !== undefined) {
      dadosAtualizacao.setor = data.setor;
    }

    if (data.loja !== undefined) {
      dadosAtualizacao.loja = data.loja;
    }

    if (data.email !== undefined) {
      dadosAtualizacao.email = data.email?.trim() || null;
    }

    if (data.inativo !== undefined) {
      dadosAtualizacao.inativo = data.inativo;
    }

    // Atualiza o usuário
    const usuarioAtualizado = await prisma.usuarios.update({
      where: { id },
      data: dadosAtualizacao,
    });

    // Formata os dados para retorno (sem senha)
    const usuarioFormatado = {
      id: usuarioAtualizado.id,
      nome: usuarioAtualizado.nome,
      login: usuarioAtualizado.login,
      email: usuarioAtualizado.email,
      setor: usuarioAtualizado.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: usuarioAtualizado.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: usuarioAtualizado.inativo,
    };

    return NextResponse.json(usuarioFormatado, { status: 200 });

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao atualizar usuário." },
      { status: 500 }
    );
  }
}

/**
 * Função para validar dados de atualização de usuário
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateUpdateUsuarioData(data: UpdateUsuarioData): string[] {
  const errors: string[] = [];

  if (data.nome !== undefined) {
    if (!data.nome?.trim()) {
      errors.push("Nome do usuário é obrigatório");
    } else if (data.nome.trim().length > 50) {
      errors.push("Nome do usuário deve ter no máximo 50 caracteres");
    }
  }

  if (data.login !== undefined) {
    if (!data.login?.trim()) {
      errors.push("Login do usuário é obrigatório");
    } else if (data.login.trim().length > 40) {
      errors.push("Login do usuário deve ter no máximo 40 caracteres");
    }
  }

  if (data.senha !== undefined && (!Number.isInteger(data.senha) || data.senha <= 0)) {
    errors.push("Senha deve ser um número inteiro positivo");
  }

  if (data.setor !== undefined && data.setor !== null && (!Number.isInteger(data.setor) || data.setor <= 0)) {
    errors.push("ID do setor deve ser um número inteiro positivo");
  }

  if (data.loja !== undefined && data.loja !== null && (!Number.isInteger(data.loja) || data.loja <= 0)) {
    errors.push("ID da loja deve ser um número inteiro positivo");
  }

  if (data.email !== undefined && data.email && data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push("Email deve ter um formato válido");
    }
  }

  return errors;
}
