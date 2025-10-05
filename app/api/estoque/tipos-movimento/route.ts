import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tipos = await prisma.tipo_movimento.findMany({
      orderBy: { chave: 'asc' }
    });
    return Response.json(tipos, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar tipos de movimento:', error);
    return Response.json({ message: 'Erro interno ao listar tipos.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { seed } = body || {};

    if (seed) {
      // cria alguns tipos padrão se não existirem
      const defaults = [
        { chave: 1, descricao: 'Entrada' },
        { chave: 2, descricao: 'Saída' },
        { chave: 3, descricao: 'Transferência' },
        { chave: 4, descricao: 'Ajuste positivo' },
        { chave: 5, descricao: 'Ajuste negativo' },
      ];

      for (const t of defaults) {
        // upsert por chave
        await prisma.tipo_movimento.upsert({
          where: { chave: t.chave },
          update: { descricao: t.descricao },
          create: t,
        });
      }

      const tipos = await prisma.tipo_movimento.findMany({ orderBy: { chave: 'asc' } });
      return Response.json({ message: 'Tipos de movimento seed aplicados', tipos }, { status: 201 });
    }

    // criação manual
    const descricao = (body?.descricao || '').toString().trim();
    if (!descricao) {
      return Response.json({ message: 'descricao é obrigatória' }, { status: 400 });
    }
    const created = await prisma.tipo_movimento.create({ data: { descricao } });
    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tipo de movimento:', error);
    return Response.json({ message: 'Erro interno ao criar tipo.' }, { status: 500 });
  }
}


