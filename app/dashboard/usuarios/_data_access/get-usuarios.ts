// app/dashboard/usuarios/_data_access/get-usuarios.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Função para buscar todos os usuários
 * @returns Promise<NextResponse> - Lista de usuários ou erro
 */
export async function getUsuarios() {
  try {
    const usuarios = await prisma.usuarios.findMany({
      orderBy: {
        nome: 'asc', // Ordena os usuários por nome em ordem alfabética
      },
    });

    // Formata os dados para retorno
    const usuariosFormatados = usuarios.map(usuario => ({
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      email: usuario.email,
      setor: usuario.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: usuario.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: usuario.inativo,
      // Não retorna a senha por segurança
    }));

    return NextResponse.json(usuariosFormatados, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar usuários." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar um usuário específico por ID
 * @param id - ID do usuário
 * @returns Promise<NextResponse> - Usuário encontrado ou erro
 */
export async function getUsuarioById(id: number) {
  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Formata os dados para retorno (sem senha)
    const usuarioFormatado = {
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      email: usuario.email,
      setor: usuario.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: usuario.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: usuario.inativo,
    };

    return NextResponse.json(usuarioFormatado, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar usuário." },
      { status: 500 }
    );
  }
}

/**
 * Função para buscar usuários por login
 * @param login - Login do usuário
 * @returns Promise<NextResponse> - Usuários encontrados ou erro
 */
export async function getUsuariosByLogin(login: string) {
  try {
    const usuarios = await prisma.usuarios.findMany({
      where: {
        login: {
          contains: login,
          mode: 'insensitive'
        }
      },
      orderBy: {
        nome: 'asc'
      },
    });

    // Formata os dados para retorno (sem senha)
    const usuariosFormatados = usuarios.map(usuario => ({
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      email: usuario.email,
      setor: usuario.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: usuario.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: usuario.inativo,
    }));

    return NextResponse.json(usuariosFormatados, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar usuários por login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar usuários." },
      { status: 500 }
    );
  }
}

/**
 * Função para autenticar usuário (login)
 * @param login - Login do usuário
 * @param senha - Senha do usuário
 * @returns Promise<NextResponse> - Usuário autenticado ou erro
 */
export async function authenticateUsuario(login: string, senha: number) {
  try {
    const usuario = await prisma.usuarios.findFirst({
      where: {
        login: login,
        senha: senha,
        inativo: false // Só permite login de usuários ativos
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Login ou senha inválidos" },
        { status: 401 }
      );
    }

    // Formata os dados para retorno (sem senha)
    const usuarioFormatado = {
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      email: usuario.email,
      setor: usuario.setor,
      setor_descricao: null, // Será preenchido separadamente se necessário
      loja: usuario.loja,
      loja_nome: null, // Será preenchido separadamente se necessário
      inativo: usuario.inativo,
    };

    return NextResponse.json(usuarioFormatado, { status: 200 });

  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao autenticar usuário." },
      { status: 500 }
    );
  }
}
