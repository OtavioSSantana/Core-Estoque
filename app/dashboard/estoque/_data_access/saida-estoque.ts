// app/dashboard/estoque/_data_access/saida-estoque.ts

// Funções de data access client-side para registrar saídas e transferências via API

/**
 * Interface para dados de saída de estoque
 */
export interface SaidaEstoqueData {
  produto_id: string | number;
  quantidade: string | number;
  motivo?: string;
  tipo_saida?: string;
  observacoes?: string;
  loja_id?: string | number;
}

/**
 * Função para registrar saída de estoque
 * @param data - Dados da saída de estoque
 * @returns Promise<NextResponse> - Saída registrada ou erro
 */
export async function registrarSaidaEstoque(data: SaidaEstoqueData) {
  const response = await fetch('/api/estoque/saidas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, tipo: 'saida' }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Erro ao registrar saída de estoque');
  }
  return await response.json();
}

/**
 * Função para transferir estoque entre mostruário e depósito
 * @param data - Dados da transferência
 * @returns Promise<NextResponse> - Transferência realizada ou erro
 */
export async function transferirEstoque(data: {
  produto_id: string | number;
  quantidade: string | number;
  tipo_transferencia: 'mostruario_para_estoque' | 'estoque_para_mostruario';
  loja_id?: string | number;
}) {
  const response = await fetch('/api/estoque/saidas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, tipo: 'transferencia' }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Erro ao transferir estoque');
  }
  return await response.json();
}

/**
 * Função para validar dados de saída de estoque
 * @param data - Dados a serem validados
 * @returns string[] - Array de erros encontrados
 */
export function validateSaidaEstoqueData(data: SaidaEstoqueData): string[] {
  const errors: string[] = [];

  if (!data.produto_id) {
    errors.push("ID do produto é obrigatório");
  } else if (isNaN(parseInt(data.produto_id.toString()))) {
    errors.push("ID do produto deve ser um número válido");
  }

  if (!data.quantidade) {
    errors.push("Quantidade é obrigatória");
  } else if (isNaN(parseInt(data.quantidade.toString()))) {
    errors.push("Quantidade deve ser um número válido");
  } else if (parseInt(data.quantidade.toString()) <= 0) {
    errors.push("Quantidade deve ser maior que zero");
  }

  return errors;
}
