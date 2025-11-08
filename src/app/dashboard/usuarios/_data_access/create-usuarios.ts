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
    
    // Garantir que senha é número
    const senhaNumero = typeof senha === 'string' ? parseInt(senha, 10) : senha;
    
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

    if (!senhaNumero || isNaN(senhaNumero)) {
      return NextResponse.json(
        { message: "Senha do usuário é obrigatória e deve ser um número" },
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

    // Setor e loja são opcionais - se não existirem, salva como null (não bloqueia)
    let setorId: number | null = null;
    let lojaId: number | null = null;

    if (data.setor) {
      // Converter para número se for string
      const setorIdNum = typeof data.setor === 'string' ? parseInt(data.setor, 10) : Number(data.setor);
      
      if (!isNaN(setorIdNum) && setorIdNum > 0) {
        try {
          const setorExiste = await prisma.setor.findUnique({
            where: { id: setorIdNum }
          });
          
          if (setorExiste) {
            setorId = setorIdNum;
          } else {
            console.warn(`Setor com ID ${setorIdNum} não encontrado. Usuário será criado sem setor.`);
          }
        } catch (error) {
          console.warn(`Erro ao verificar setor ${setorIdNum}:`, error);
          // Continua sem setor
        }
      }
    }

    if (data.loja) {
      // Converter para número se for string
      const lojaIdNum = typeof data.loja === 'string' ? parseInt(data.loja, 10) : Number(data.loja);
      
      if (!isNaN(lojaIdNum) && lojaIdNum > 0) {
        try {
          const lojaExiste = await prisma.lojas.findUnique({
            where: { id: lojaIdNum }
          });
          
          if (lojaExiste) {
            lojaId = lojaIdNum;
          } else {
            console.warn(`Loja com ID ${lojaIdNum} não encontrada. Usuário será criado sem loja.`);
          }
        } catch (error) {
          console.warn(`Erro ao verificar loja ${lojaIdNum}:`, error);
          // Continua sem loja
        }
      }
    }

    // Cria o novo usuário
    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome: nome.trim(),
        login: login.trim(),
        senha: senhaNumero,
        setor: setorId,
        loja: lojaId,
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
      setor_descricao: null,
      loja: novoUsuario.loja,
      loja_nome: null,
      inativo: novoUsuario.inativo,
    };

    return NextResponse.json(usuarioFormatado, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    
    // Retornar mensagem de erro mais específica
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    // Verificar se é erro de constraint do banco
    if (errorMessage.includes('Unique constraint') || errorMessage.includes('duplicate')) {
      return NextResponse.json(
        { message: "Já existe um usuário com este login ou email" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { message: `Erro ao criar usuário: ${errorMessage}` },
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
