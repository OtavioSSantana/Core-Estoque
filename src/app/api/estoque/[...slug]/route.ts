import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { 
  entradaSchema, 
  saidaSchema, 
  movimentoSchema,
  transferenciaLojasSchema,
  ajusteSchema 
} from '@/app/dashboard/estoque/_schemas/movimentacao-schema';
import { createEntrada } from '@/app/dashboard/estoque/_data_access/create-entrada';
import { createSaida } from '@/app/dashboard/estoque/_data_access/create-saida';
import { createTransferenciaMostruario } from '@/app/dashboard/estoque/_data_access/create-transferencia-mostruario';
import { createTransferenciaLojas } from '@/app/dashboard/estoque/_data_access/create-transferencia-lojas';
import { createAjuste } from '@/app/dashboard/estoque/_data_access/create-ajuste';
import { TIPO_MOVIMENTO } from '@/app/dashboard/estoque/_constants/tipo-movimento';
import { getTiposMovimento } from '@/app/dashboard/estoque/_constants/tipo-movimento';

// Helper para verificar autenticação
async function checkAuth() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }
    return null;
  } catch (error) {
    // Tratamento de erros de conexão com banco de dados
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as { code?: string })?.code;
    
    if (errorCode === 'P1001' || errorMessage.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { message: 'Erro de conexão com o banco de dados. Verifique sua conexão.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { message: 'Erro ao verificar autenticação' },
      { status: 500 }
    );
  }
}

// GET /api/estoque/* - Roteamento para GET requests com slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const path = slug?.[0] || '';

    // GET /api/estoque/tipos-movimento - Listar tipos de movimento
    if (path === 'tipos-movimento') {
      const tipos = getTiposMovimento();
      return NextResponse.json(tipos, { status: 200 });
    }

    // Outras rotas GET podem ser adicionadas aqui
    return NextResponse.json(
      { message: 'Rota não encontrada' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Erro na requisição GET:', error);
    
    // Tratamento de erros de conexão com banco de dados
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as { code?: string })?.code;
    
    if (errorCode === 'P1001' || errorMessage.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { message: 'Erro de conexão com o banco de dados. Verifique sua conexão.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { message: 'Falha ao processar requisição' },
      { status: 500 }
    );
  }
}

// POST /api/estoque/* - Roteamento centralizado para todas as operações
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    // Verificar autenticação
    const authError = await checkAuth();
    if (authError) return authError;

    const { slug } = await params;
    const path = slug?.[0] || '';
    const body = await request.json();

    // POST /api/estoque/movimentacoes - Entradas e transferências mostruário
    if (path === 'movimentacoes') {
      const { tipo_movimento } = body;

      // Entradas (tipo 1 ou 5)
      if (tipo_movimento === TIPO_MOVIMENTO.ENTRADA || tipo_movimento === TIPO_MOVIMENTO.DEVOLUCAO_CLIENTE) {
        const schema = entradaSchema.safeParse(body);
        if (!schema.success) {
          return NextResponse.json(
            { message: schema.error.issues[0].message },
            { status: 400 }
          );
        }
        const resultado = await createEntrada({
          produto_id: schema.data.produto_id,
          quantidade: schema.data.quantidade,
          loja_id: schema.data.loja_id,
          fornecedor_id: schema.data.fornecedor_id
        });
        return NextResponse.json(
          { message: 'Entrada registrada com sucesso!', data: resultado },
          { status: 201 }
        );
      }

      // Transferências mostruário (tipo 3 ou 4)
      if (tipo_movimento === TIPO_MOVIMENTO.ENVIAR_MOSTRUARIO || tipo_movimento === TIPO_MOVIMENTO.RETORNAR_MOSTRUARIO) {
        const schema = movimentoSchema.safeParse(body);
        if (!schema.success) {
          return NextResponse.json(
            { message: schema.error.issues[0].message },
            { status: 400 }
          );
        }
        const resultado = await createTransferenciaMostruario({
          produto_id: schema.data.produto_id,
          quantidade: schema.data.quantidade,
          loja_id: schema.data.loja_id,
          tipo_movimento: schema.data.tipo_movimento as typeof TIPO_MOVIMENTO.ENVIAR_MOSTRUARIO | typeof TIPO_MOVIMENTO.RETORNAR_MOSTRUARIO
        });
        return NextResponse.json(
          { message: 'Transferência realizada com sucesso!', data: resultado },
          { status: 201 }
        );
      }

      return NextResponse.json(
        { message: 'Tipo de movimento não suportado nesta rota' },
        { status: 400 }
      );
    }

    // POST /api/estoque/saidas - Saídas e transferências mostruário (compatibilidade)
    if (path === 'saidas') {
      const { tipo, tipo_transferencia } = body;

      // Se for transferência mostruário (vindo do update-estoque.ts)
      if (tipo === 'transferencia' && tipo_transferencia) {
        const schema = z.object({
          produto_id: z.number(),
          quantidade: z.number(),
          loja_id: z.number(),
        }).safeParse(body);

        if (!schema.success) {
          return NextResponse.json(
            { message: 'Dados inválidos' },
            { status: 400 }
          );
        }

        const tipoMov = tipo_transferencia === 'estoque_para_mostruario' 
          ? TIPO_MOVIMENTO.ENVIAR_MOSTRUARIO 
          : TIPO_MOVIMENTO.RETORNAR_MOSTRUARIO;

        const resultado = await createTransferenciaMostruario({
          produto_id: schema.data.produto_id,
          quantidade: schema.data.quantidade,
          loja_id: schema.data.loja_id,
          tipo_movimento: tipoMov
        });

        return NextResponse.json(
          { message: 'Transferência realizada com sucesso!', data: resultado },
          { status: 201 }
        );
      }

      // Saídas normais
      const schema = saidaSchema.safeParse(body);
      if (!schema.success) {
        return NextResponse.json(
          { message: schema.error.issues[0].message },
          { status: 400 }
        );
      }

      const resultado = await createSaida({
        produto_id: schema.data.produto_id,
        quantidade: schema.data.quantidade,
        loja_id: schema.data.loja_id
      });

      return NextResponse.json(
        { message: 'Saída registrada com sucesso!', data: resultado },
        { status: 201 }
      );
    }

    // POST /api/estoque/ajustes - Ajustes de estoque
    if (path === 'ajustes') {
      const { tipo_ajuste, quantidade_ajuste } = body;

      // Compatibilidade com update-estoque.ts (formato antigo)
      if (tipo_ajuste && quantidade_ajuste) {
        if (tipo_ajuste === 'entrada') {
          const resultado = await createEntrada({
            produto_id: body.produto_id,
            quantidade: parseInt(quantidade_ajuste.toString()),
            loja_id: body.loja_id || 1, // fallback
          });
          return NextResponse.json(
            { message: 'Ajuste positivo realizado!', data: resultado },
            { status: 201 }
          );
        } else if (tipo_ajuste === 'saida') {
          const resultado = await createSaida({
            produto_id: body.produto_id,
            quantidade: parseInt(quantidade_ajuste.toString()),
            loja_id: body.loja_id || 1, // fallback
          });
          return NextResponse.json(
            { message: 'Ajuste negativo realizado!', data: resultado },
            { status: 201 }
          );
        }
      }

      // Formato novo com schema
      const schema = ajusteSchema.safeParse(body);
      if (!schema.success) {
        return NextResponse.json(
          { message: schema.error.issues[0].message },
          { status: 400 }
        );
      }

      const resultado = await createAjuste({
        produto_id: schema.data.produto_id,
        quantidade: schema.data.quantidade,
        loja_id: schema.data.loja_id,
        direcao: schema.data.direcao,
        motivo: schema.data.motivo
      });

      return NextResponse.json(
        { message: 'Ajuste realizado com sucesso!', data: resultado },
        { status: 201 }
      );
    }

    // POST /api/estoque/transferencias - Transferências entre lojas
    if (path === 'transferencias') {
      const schema = transferenciaLojasSchema.safeParse(body);

      if (!schema.success) {
        return NextResponse.json(
          { message: schema.error.issues[0].message },
          { status: 400 }
        );
      }

      const resultado = await createTransferenciaLojas({
        produto_id: schema.data.produto_id,
        quantidade: schema.data.quantidade,
        loja_origem: schema.data.loja_origem,
        loja_destino: schema.data.loja_destino
      });

      return NextResponse.json(
        { message: 'Transferência entre lojas realizada com sucesso!', data: resultado },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: 'Rota não encontrada' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Falha ao processar requisição' },
      { status: 500 }
    );
  }
}

