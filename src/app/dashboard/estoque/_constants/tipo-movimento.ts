export const TIPO_MOVIMENTO = {
    ENTRADA: 1,
    SAIDA: 2,
    ENVIAR_MOSTRUARIO: 3,
    RETORNAR_MOSTRUARIO: 4,
    DEVOLUCAO_CLIENTE: 5,
    DEVOLUCAO_FORNECEDOR: 6,
    AJUSTE: 7,
    PERDA_AVARIA: 8,
    TRANSFERENCIA_LOJAS: 'transfer_between_stores'
  } as const;
  
  export const TIPO_MOVIMENTO_DESC: Record<number | string, string> = {
    1: 'Entrada',
    2: 'Saída',
    3: 'Enviar para Mostruário',
    4: 'Retornar do Mostruário',
    5: 'Devolução de Cliente',
    6: 'Devolução ao Fornecedor',
    7: 'Ajuste',
    8: 'Perda/Avaria',
    'transfer_between_stores': 'Transferência entre Lojas'
  };
  
  export type TipoMovimento = typeof TIPO_MOVIMENTO[keyof typeof TIPO_MOVIMENTO];
  
  // Função helper para verificar se é entrada (aumenta estoque)
  export function isEntrada(tipo: number | string): boolean {
    return tipo === TIPO_MOVIMENTO.ENTRADA || 
           tipo === TIPO_MOVIMENTO.DEVOLUCAO_CLIENTE;
  }
  
  // Função helper para verificar se é saída (diminui estoque)
  export function isSaida(tipo: number | string): boolean {
    return tipo === TIPO_MOVIMENTO.SAIDA || 
           tipo === TIPO_MOVIMENTO.DEVOLUCAO_FORNECEDOR || 
           tipo === TIPO_MOVIMENTO.PERDA_AVARIA;
  }
  
  // Retorna lista de tipos para uso em selects
  export function getTiposMovimento() {
    return Object.entries(TIPO_MOVIMENTO_DESC).map(([chave, descricao]) => ({
      chave: chave === 'transfer_between_stores' ? chave : parseInt(chave),
      descricao
    }));
  }