import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const lojas = await prisma.lojas.findMany({
      orderBy: { nome: 'asc' },
      select: { id: true, nome: true },
    });
    return Response.json(lojas, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar lojas:', error);
    return Response.json(
      { message: 'Erro interno do servidor ao buscar lojas.' },
      { status: 500 }
    );
  }
}


