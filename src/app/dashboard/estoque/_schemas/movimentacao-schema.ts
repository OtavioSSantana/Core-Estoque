import { z } from "zod";

// Schema para entrada de estoque
export const entradaSchema = z.object({
  produto_id: z.number().int().positive("ID do produto deve ser um número positivo"),
  quantidade: z.number().int().positive("A quantidade deve ser maior que zero"),
  loja_id: z.number().int().positive("ID da loja deve ser um número positivo"),
  tipo_movimento: z.literal(1).or(z.literal(5)), // Apenas tipos de entrada
  fornecedor_id: z.number().int().positive().optional(),
});

export type EntradaSchema = z.infer<typeof entradaSchema>;

// Schema para saída de estoque
export const saidaSchema = z.object({
  produto_id: z.number().int().positive("ID do produto deve ser um número positivo"),
  quantidade: z.number().int().positive("A quantidade deve ser maior que zero"),
  loja_id: z.number().int().positive("ID da loja deve ser um número positivo"),
  tipo_movimento: z.literal(2).or(z.literal(6)).or(z.literal(8)), // Apenas tipos de saída
  motivo: z.string().optional(),
});

export type SaidaSchema = z.infer<typeof saidaSchema>;

// Schema para transferência mostruário
export const transferenciaMostruarioSchema = z.object({
  produto_id: z.number().int().positive("ID do produto deve ser um número positivo"),
  quantidade: z.number().int().positive("A quantidade deve ser maior que zero"),
  loja_id: z.number().int().positive("ID da loja deve ser um número positivo"),
  tipo_movimento: z.literal(3).or(z.literal(4)), // 3 = enviar, 4 = retornar
});

export type TransferenciaMostruarioSchema = z.infer<typeof transferenciaMostruarioSchema>;

// Schema para transferência entre lojas
export const transferenciaLojasSchema = z.object({
  produto_id: z.number().int().positive("ID do produto deve ser um número positivo"),
  quantidade: z.number().int().positive("A quantidade deve ser maior que zero"),
  loja_origem: z.number().int().positive("ID da loja origem deve ser um número positivo"),
  loja_destino: z.number().int().positive("ID da loja destino deve ser um número positivo"),
}).refine(data => data.loja_origem !== data.loja_destino, {
  message: "A loja origem deve ser diferente da loja destino"
});

export type TransferenciaLojasSchema = z.infer<typeof transferenciaLojasSchema>;

// Schema para ajuste
export const ajusteSchema = z.object({
  produto_id: z.number().int().positive("ID do produto deve ser um número positivo"),
  quantidade: z.number().int().positive("A quantidade deve ser maior que zero"),
  loja_id: z.number().int().positive("ID da loja deve ser um número positivo"),
  direcao: z.enum(['positivo', 'negativo']),
  motivo: z.string().optional(),
});

export type AjusteSchema = z.infer<typeof ajusteSchema>;

// Schema genérico para outros movimentos
export const movimentoSchema = z.object({
  produto_id: z.number().int().positive("ID do produto deve ser um número positivo"),
  quantidade: z.number().int().positive("A quantidade deve ser maior que zero"),
  loja_id: z.number().int().positive("ID da loja deve ser um número positivo"),
  tipo_movimento: z.union([
    z.literal(3), // Enviar para Mostruário
    z.literal(4), // Retornar do Mostruário
    z.literal(7), // Ajuste (precisa de direcao)
  ]),
  direcao: z.enum(['positivo', 'negativo']).optional(), // Para ajuste
  motivo: z.string().optional(),
});

export type MovimentoSchema = z.infer<typeof movimentoSchema>;