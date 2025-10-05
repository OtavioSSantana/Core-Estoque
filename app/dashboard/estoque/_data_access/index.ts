// app/dashboard/estoque/_data_access/index.ts

// Exporta todas as funções de data access para facilitar as importações

// GET operations
export { 
  getEstoque, 
  getMovimentacoesEstoque, 
  getEstoqueBaixo, 
  getResumoEstoque 
} from './get-estoque';
export type { EstoqueItem, MovimentacaoEstoque } from './get-estoque';

// CREATE operations (movimentações)
export { 
  createMovimentacao, 
  validateCreateMovimentacaoData 
} from './create-movimentacao';
export type { CreateMovimentacaoData } from './create-movimentacao';

// UPDATE operations
export { 
  updateEstoque, 
  ajustarEstoque, 
  validateUpdateEstoqueData 
} from './update-estoque';
export type { UpdateEstoqueData } from './update-estoque';

// SAÍDA operations
export { 
  registrarSaidaEstoque, 
  transferirEstoque, 
  validateSaidaEstoqueData 
} from './saida-estoque';
export type { SaidaEstoqueData } from './saida-estoque';
