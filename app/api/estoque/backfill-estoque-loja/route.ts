import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Busca produtos com loja definida
    const produtos = await prisma.produtos.findMany({
      where: { loja: { not: null } },
      select: {
        id: true,
        loja: true,
        quantidade_estoque: true,
        quantidade_mostruario: true,
        quantidade_disponivel: true,
      }
    });

    let created = 0;
    for (const p of produtos) {
      const lojaId = p.loja as number;
      await (prisma as any).estoque_loja.upsert({
        where: { produto_id_loja_id: { produto_id: p.id, loja_id: lojaId } },
        update: {
          quantidade_estoque: p.quantidade_estoque ?? 0,
          quantidade_mostruario: p.quantidade_mostruario ?? 0,
          quantidade_disponivel: p.quantidade_disponivel ?? 0,
        },
        create: {
          produto_id: p.id,
          loja_id: lojaId,
          quantidade_estoque: p.quantidade_estoque ?? 0,
          quantidade_mostruario: p.quantidade_mostruario ?? 0,
          quantidade_disponivel: p.quantidade_disponivel ?? 0,
        },
      });
      created++;
    }

    return Response.json({ message: 'Backfill concluído', registros: created }, { status: 201 });
  } catch (error) {
    console.error('Erro no backfill estoque_loja:', error);
    return Response.json({ message: 'Erro ao executar backfill' }, { status: 500 });
  }
}


