// app/dashboard/estoque/_data_access/index.ts

// Exporta todas as funções de data access para facilitar as importações

// GET operations
export { getEstoque } from './get-estoque';
export type { EstoqueItem } from './get-estoque';

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

// NOVAS FUNÇÕES PURAS - Entrada
export { createEntrada } from './create-entrada';
export type { CreateEntradaData } from './create-entrada';

// NOVAS FUNÇÕES PURAS - Saída
export { createSaida } from './create-saida';
export type { CreateSaidaData } from './create-saida';

// NOVAS FUNÇÕES PURAS - Transferência Mostruário
export { createTransferenciaMostruario } from './create-transferencia-mostruario';
export type { CreateTransferenciaMostruarioData } from './create-transferencia-mostruario';

// NOVAS FUNÇÕES PURAS - Transferência entre Lojas
export { createTransferenciaLojas } from './create-transferencia-lojas';
export type { CreateTransferenciaLojasData } from './create-transferencia-lojas';

// NOVAS FUNÇÕES PURAS - Ajuste
export { createAjuste } from './create-ajuste';
export type { CreateAjusteData } from './create-ajuste';