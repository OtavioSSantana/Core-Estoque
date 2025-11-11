import { xmlToJson } from './xml-parser';

/**
 * Busca os itens de um pedido específico na API do Tiny
 * 
 * @param pedidoId - ID do pedido no Tiny
 * @returns Array de itens do pedido
 */
export async function buscarItensPedido(pedidoId: string): Promise<any[]> {
  const token = process.env.TINY_API_TOKEN;
  if (!token) {
    console.error('Token da API Tiny não configurado');
    return [];
  }

  const url = `https://api.tiny.com.br/api2/pedido.obter.php?token=${token}&id=${pedidoId}&formato=json`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Erro ao buscar pedido ${pedidoId}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    
    // Log para debug
    console.log(`[DEBUG] Resposta API para pedido ${pedidoId}:`, JSON.stringify(data).substring(0, 500));
    
    // Verificar se há erro na resposta
    if (data.retorno?.status === 'Erro') {
      console.error(`Erro na API Tiny para pedido ${pedidoId}:`, data.retorno.erros);
      return [];
    }
    
    // Se retornar XML, converter
    if (typeof data === 'string' && data.includes('<')) {
      try {
        const jsonData = await xmlToJson(data);
        console.log(`[DEBUG] XML parseado para pedido ${pedidoId}:`, JSON.stringify(jsonData).substring(0, 500));
        
        // Extrair itens do XML parseado - tentar diferentes estruturas
        if (jsonData.pedido?.itens?.item) {
          const itens = jsonData.pedido.itens.item;
          const itensArray = Array.isArray(itens) ? itens : [itens];
          console.log(`[DEBUG] Encontrados ${itensArray.length} itens no XML para pedido ${pedidoId}`);
          return itensArray;
        }
        
        // Tentar estrutura alternativa
        if (jsonData.retorno?.pedido?.itens?.item) {
          const itens = jsonData.retorno.pedido.itens.item;
          const itensArray = Array.isArray(itens) ? itens : [itens];
          console.log(`[DEBUG] Encontrados ${itensArray.length} itens no XML (estrutura alternativa) para pedido ${pedidoId}`);
          return itensArray;
        }
        
        console.warn(`[DEBUG] Nenhum item encontrado no XML para pedido ${pedidoId}. Estrutura:`, Object.keys(jsonData));
        return [];
      } catch (xmlError) {
        console.error(`Erro ao parsear XML do pedido ${pedidoId}:`, xmlError);
        return [];
      }
    }
    
    // Se já for JSON - verificar estrutura retorno.pedido.itens.item
    if (data.retorno?.pedido?.itens?.item) {
      const itens = data.retorno.pedido.itens.item;
      const itensArray = Array.isArray(itens) ? itens : [itens];
      console.log(`[DEBUG] Encontrados ${itensArray.length} itens no JSON para pedido ${pedidoId}`);
      return itensArray;
    }
    
    // Tentar estrutura alternativa - pedido.itens.item (sem retorno)
    if (data.pedido?.itens?.item) {
      const itens = data.pedido.itens.item;
      const itensArray = Array.isArray(itens) ? itens : [itens];
      console.log(`[DEBUG] Encontrados ${itensArray.length} itens (estrutura alternativa) para pedido ${pedidoId}`);
      return itensArray;
    }
    
    // Tentar estrutura retorno.itens.item
    if (data.retorno?.itens?.item) {
      const itens = data.retorno.itens.item;
      const itensArray = Array.isArray(itens) ? itens : [itens];
      console.log(`[DEBUG] Encontrados ${itensArray.length} itens (estrutura retorno.itens) para pedido ${pedidoId}`);
      return itensArray;
    }
    
    // Log da estrutura completa para debug
    console.warn(`[DEBUG] Nenhum item encontrado para pedido ${pedidoId}. Estrutura da resposta:`, {
      temRetorno: !!data.retorno,
      temPedido: !!data.retorno?.pedido,
      temItens: !!data.retorno?.pedido?.itens,
      chaves: Object.keys(data),
      chavesRetorno: data.retorno ? Object.keys(data.retorno) : [],
      chavesPedido: data.retorno?.pedido ? Object.keys(data.retorno.pedido) : []
    });
    
    return [];
  } catch (error) {
    console.error(`Erro ao buscar itens do pedido ${pedidoId}:`, error);
    return [];
  }
}

