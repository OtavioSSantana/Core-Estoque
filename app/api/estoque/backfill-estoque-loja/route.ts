import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Busca todos os produtos
    const produtos = await prisma.produtos.findMany({
      select: {
        id: true,
        quantidade_estoque: true,
        quantidade_mostruario: true,
        quantidade_disponivel: true,
      }
    });

    // Busca todas as lojas
    const lojas = await prisma.lojas.findMany({
      select: { id: true }
    });

    let created = 0;
    
    // Para cada produto, cria registros de estoque para todas as lojas
    for (const produto of produtos) {
      for (const loja of lojas) {
        await prisma.estoque_loja.upsert({
          where: { 
            produto_id_loja_id: { 
              produto_id: produto.id, 
              loja_id: loja.id 
            } 
          },
          update: {
            quantidade_estoque: produto.quantidade_estoque ?? 0,
            quantidade_mostruario: produto.quantidade_mostruario ?? 0,
            quantidade_disponivel: produto.quantidade_disponivel ?? 0,
          },
          create: {
            produto_id: produto.id,
            loja_id: loja.id,
            quantidade_estoque: produto.quantidade_estoque ?? 0,
            quantidade_mostruario: produto.quantidade_mostruario ?? 0,
            quantidade_disponivel: produto.quantidade_disponivel ?? 0,
          },
        });
        created++;
      }
    }

    return Response.json({ message: 'Backfill concluído', registros: created }, { status: 201 });
  } catch (error) {
    console.error('Erro no backfill estoque_loja:', error);
    return Response.json({ message: 'Erro ao executar backfill' }, { status: 500 });
  }
}


