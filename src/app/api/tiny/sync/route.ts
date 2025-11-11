import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { determinarLojaPedido } from './utils/determinar-loja';
import { buscarItensPedido } from './utils/buscar-itens-pedido';

// Função para converter data DD/MM/YYYY para Date
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  try {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;
    return new Date(`${year}-${month}-${day}`);
  } catch {
    return null;
  }
}

/**
 * Endpoint para sincronizar pedidos do Tiny ERP
 * GET /api/tiny/sync
 * 
 * Executado automaticamente via cron job a cada 5 minutos
 */
export async function GET(request: NextRequest) {
  try {
    const token = process.env.TINY_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { message: 'Token da API Tiny não configurado' },
        { status: 500 }
      );
    }

    // Verificar autenticação (cron secret)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    console.log('Iniciando sincronização de pedidos Tiny...');

    // Calcular data de uma semana atrás
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - 7); // 7 dias atrás (semana passada)
    const dataFim = new Date();

    // Formatar datas no formato esperado pela API Tiny (DD/MM/YYYY)
    const formatarDataTiny = (data: Date): string => {
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    };

    const dataInicioFormatada = formatarDataTiny(dataInicio);
    const dataFimFormatada = formatarDataTiny(dataFim);

    console.log(`Buscando pedidos de ${dataInicioFormatada} até ${dataFimFormatada}`);

    // Buscar pedidos da API Tiny (última semana)
    const url = `https://api.tiny.com.br/api2/pedidos.pesquisa.php?token=${token}&formato=json&dataInicial=${dataInicioFormatada}&dataFinal=${dataFimFormatada}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.retorno?.status !== 'OK') {
      return NextResponse.json(
        { 
          message: 'Erro na API Tiny', 
          detalhes: data.retorno?.erros || 'Erro desconhecido' 
        },
        { status: 400 }
      );
    }

    const pedidos = data.retorno.pedidos || [];
    const pedidosArray = Array.isArray(pedidos) ? pedidos : [pedidos];
    
    let processados = 0;
    let novos = 0;
    let atualizados = 0;
    const erros: string[] = [];

    // Processar cada pedido
    for (const item of pedidosArray) {
      try {
        const pedidoData = item.pedido || item;
        const pedidoId = String(pedidoData.id);

        // Verificar se pedido já existe
        const pedidoExistente = await prisma.pedidos.findUnique({
          where: { codigo_tiny: pedidoId }
        });

        const dataPedido = parseDate(pedidoData.data_pedido);
        const valorTotal = pedidoData.valor ? parseFloat(String(pedidoData.valor)) : null;

        // Determinar loja pelo vendedor
        const lojaId = await determinarLojaPedido({
          id_vendedor: pedidoData.id_vendedor ? String(pedidoData.id_vendedor) : undefined,
          nome_vendedor: pedidoData.nome_vendedor || undefined
        });

        const dadosPedido = {
          codigo_tiny: pedidoId,
          numero: pedidoData.numero ? String(pedidoData.numero) : null,
          data_pedido: dataPedido,
          cliente_nome: pedidoData.nome || null,
          valor_total: valorTotal,
          id_vendedor: pedidoData.id_vendedor ? String(pedidoData.id_vendedor) : null,
          nome_vendedor: pedidoData.nome_vendedor || null,
          situacao: pedidoData.situacao || null,
          status: pedidoData.situacao || null,
          loja_id: lojaId,
          sincronizado_em: new Date(),
        };

        let pedidoDb;

        if (pedidoExistente) {
          // Atualizar pedido existente (não alterar estoque_baixado se já foi processado)
          const dadosUpdate: any = { ...dadosPedido };
          if (pedidoExistente.estoque_baixado) {
            // Se já foi processado, não alterar campos relacionados ao processamento
            delete dadosUpdate.estoque_baixado;
            delete dadosUpdate.estoque_baixado_em;
          }

          pedidoDb = await prisma.pedidos.update({
            where: { id: pedidoExistente.id },
            data: dadosUpdate
          });
          atualizados++;
        } else {
          // Criar novo pedido
          pedidoDb = await prisma.pedidos.create({
            data: {
              ...dadosPedido,
              estoque_baixado: false
            }
          });
          novos++;
        }

        // Buscar e processar itens do pedido
        const itens = await buscarItensPedido(pedidoId);
        
        console.log(`Pedido ${pedidoId}: ${itens.length} itens encontrados`);
        
        if (itens.length > 0 && pedidoDb) {
          // Deletar itens antigos
          await prisma.itens_pedido.deleteMany({
            where: { pedido_id: pedidoDb.id }
          });

          // Criar novos itens
          const itensArray = Array.isArray(itens) ? itens : [itens];
          
          for (const itemData of itensArray) {
            const quantidade = parseFloat(String(itemData.quantidade || 0));
            const valorUnitario = parseFloat(String(itemData.valor_unitario || 0));
            const valorTotal = quantidade * valorUnitario;

            // Tentar encontrar produto pelo código
            let produtoId = null;
            if (itemData.codigo) {
              const produto = await prisma.produtos.findUnique({
                where: { codigo: String(itemData.codigo) }
              });
              produtoId = produto?.id || null;
            }

            await prisma.itens_pedido.create({
              data: {
                pedido_id: pedidoDb.id,
                produto_id: produtoId,
                codigo_produto_tiny: itemData.codigo || null,
                descricao: itemData.descricao || null,
                quantidade: quantidade,
                valor_unitario: valorUnitario,
                valor_total: valorTotal,
              }
            });
          }
        }

        processados++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
        erros.push(`Pedido ${item.pedido?.id || 'desconhecido'}: ${errorMsg}`);
        console.error('Erro ao processar pedido:', error);
      }
    }

    return NextResponse.json({
      success: true,
      resumo: {
        total_encontrados: pedidosArray.length,
        processados,
        novos,
        atualizados,
        erros: erros.length
      },
      erros: erros.length > 0 ? erros : undefined,
      message: `Sincronização concluída: ${novos} novos, ${atualizados} atualizados`
    });

  } catch (error) {
    console.error('Erro na sincronização:', error);
    return NextResponse.json(
      { 
        message: 'Erro ao sincronizar pedidos',
        erro: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

