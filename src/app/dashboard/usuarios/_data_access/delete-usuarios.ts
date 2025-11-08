// app/dashboard/usuarios/_data_access/delete-usuarios.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Função para deletar um usuário
 * @param id - ID do usuário a ser deletado
 * @returns Promise<NextResponse> - Confirmação de exclusão ou erro
 */
export async function deleteUsuario(id: number) {
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

    // Verifica se o usuário pode ser deletado
    const canDelete = await canDeleteUsuario(id);
    if (!canDelete) {
      return NextResponse.json(
        { message: "Não é possível deletar este usuário. Ele pode estar associado a outras entidades do sistema." },
        { status: 409 }
      );
    }

    // Deleta o usuário
    await prisma.usuarios.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Usuário deletado com sucesso" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao deletar usuário." },
      { status: 500 }
    );
  }
}

/**
 * Função para verificar se um usuário pode ser deletado
 * @param id - ID do usuário
 * @returns Promise<boolean> - True se pode ser deletado, false caso contrário
 */
export async function canDeleteUsuario(id: number): Promise<boolean> {
  try {
    // Verifica se o usuário é gerente de alguma loja
    const lojaComGerente = await prisma.lojas.findFirst({
      where: { gerente: id }
    });

    if (lojaComGerente) {
      return false; // Não pode deletar se for gerente de uma loja
    }

    // Aqui você pode adicionar outras verificações se necessário
    // Por exemplo, se o usuário tem movimentações de estoque, etc.

    return true;

  } catch (error) {
    console.error("Erro ao verificar se usuário pode ser deletado:", error);
    return false;
  }
}

/**
 * Função para validar ID de usuário
 * @param id - ID a ser validado
 * @returns string[] - Array de erros encontrados
 */
export function validateUsuarioId(id: number): string[] {
  const errors: string[] = [];

  if (!Number.isInteger(id) || id <= 0) {
    errors.push("ID do usuário deve ser um número inteiro positivo");
  }

  return errors;
}

/**
 * Função para desativar um usuário (soft delete)
 * @param id - ID do usuário a ser desativado
 * @returns Promise<NextResponse> - Confirmação de desativação ou erro
 */
export async function deactivateUsuario(id: number) {
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

    // Desativa o usuário
    const usuarioDesativado = await prisma.usuarios.update({
      where: { id },
      data: { inativo: true },
    });

    // Formata os dados para retorno (sem senha)
    const usuarioFormatado = {
      id: usuarioDesativado.id,
      nome: usuarioDesativado.nome,
      login: usuarioDesativado.login,
      email: usuarioDesativado.email,
      setor: usuarioDesativado.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: usuarioDesativado.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: usuarioDesativado.inativo,
    };

    return NextResponse.json(usuarioFormatado, { status: 200 });

  } catch (error) {
    console.error("Erro ao desativar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao desativar usuário." },
      { status: 500 }
    );
  }
}

/**
 * Função para ativar um usuário
 * @param id - ID do usuário a ser ativado
 * @returns Promise<NextResponse> - Confirmação de ativação ou erro
 */
export async function activateUsuario(id: number) {
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

    // Ativa o usuário
    const usuarioAtivado = await prisma.usuarios.update({
      where: { id },
      data: { inativo: false },
    });

    // Formata os dados para retorno (sem senha)
    const usuarioFormatado = {
      id: usuarioAtivado.id,
      nome: usuarioAtivado.nome,
      login: usuarioAtivado.login,
      email: usuarioAtivado.email,
      setor: usuarioAtivado.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: usuarioAtivado.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: usuarioAtivado.inativo,
    };

    return NextResponse.json(usuarioFormatado, { status: 200 });

  } catch (error) {
    console.error("Erro ao ativar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao ativar usuário." },
      { status: 500 }
    );
  }
}
