// app/dashboard/usuarios/_data_access/create-usuarios.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Interface para os dados de criação de usuário
 */
export interface CreateUsuarioData {
  nome: string;
  login: string;
  senha: number;
  setor?: number;
  loja?: number;
  email?: string;
}

/**
 * Função para criar um novo usuário
 * @param data - Dados do usuário a ser criado
 * @returns Promise<NextResponse> - Usuário criado ou erro
 */
export async function createUsuario(data: CreateUsuarioData) {
  try {
    // Valida os campos obrigatórios
    const { nome, login, senha } = data;
    
    if (!nome?.trim()) {
      return NextResponse.json(
        { message: "Nome do usuário é obrigatório" },
        { status: 400 }
      );
    }

    if (!login?.trim()) {
      return NextResponse.json(
        { message: "Login do usuário é obrigatório" },
        { status: 400 }
      );
    }

    if (!senha) {
      return NextResponse.json(
        { message: "Senha do usuário é obrigatória" },
        { status: 400 }
      );
    }

    // Verifica se já existe um usuário com o mesmo login
    const usuarioExistente = await prisma.usuarios.findFirst({
      where: {
        login: {
          equals: login.trim(),
          mode: 'insensitive'
        }
      }
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { message: "Já existe um usuário com este login" },
        { status: 409 }
      );
    }

    // Se setor foi informado, verifica se existe
    if (data.setor) {
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
    if (data.loja) {
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

    // Cria o novo usuário
    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome: nome.trim(),
        login: login.trim(),
        senha: senha,
        setor: data.setor || null,
        loja: data.loja || null,
        email: data.email?.trim() || null,
        inativo: false,
      },
    });

    // Formata os dados para retorno (sem senha)
    const usuarioFormatado = {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      login: novoUsuario.login,
      email: novoUsuario.email,
      setor: novoUsuario.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: novoUsuario.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: novoUsuario.inativo,
    };

    // Retorna o usuário criado com status 201 (Created)
    return NextResponse.json(usuarioFormatado, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao criar usuário." },
      { status: 500 }
    );
  }
}

/**
 * Função para validar dados de criação de usuário
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateCreateUsuarioData(data: CreateUsuarioData): string[] {
  const errors: string[] = [];

  if (!data.nome?.trim()) {
    errors.push("Nome do usuário é obrigatório");
  } else if (data.nome.trim().length > 50) {
    errors.push("Nome do usuário deve ter no máximo 50 caracteres");
  }

  if (!data.login?.trim()) {
    errors.push("Login do usuário é obrigatório");
  } else if (data.login.trim().length > 40) {
    errors.push("Login do usuário deve ter no máximo 40 caracteres");
  }

  if (!data.senha) {
    errors.push("Senha do usuário é obrigatória");
  } else if (!Number.isInteger(data.senha) || data.senha <= 0) {
    errors.push("Senha deve ser um número inteiro positivo");
  }

  if (data.setor && (!Number.isInteger(data.setor) || data.setor <= 0)) {
    errors.push("ID do setor deve ser um número inteiro positivo");
  }

  if (data.loja && (!Number.isInteger(data.loja) || data.loja <= 0)) {
    errors.push("ID da loja deve ser um número inteiro positivo");
  }

  if (data.email && data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push("Email deve ter um formato válido");
    }
  }

  return errors;
}
