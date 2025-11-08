# Especificação Técnica - Implementação de APIs de Estoque

Este documento descreve exatamente o que deve ser implementado para o sistema de movimentação de estoque, seguindo o padrão do GUIA_DE_BOAS_PRATICAS.md.

## Contexto

- **Schema atual**: Não há mais `entrada_estoque` e `tipo_movimento`
- **Estoque centralizado**: Todas as quantidades são gerenciadas em `estoque_loja`
- **Tipos de movimentação**: Serão definidos como constantes/enums na aplicação (mockados)
- **Padrão**: Seguir estritamente o GUIA_DE_BOAS_PRATICAS.md

## Tipos de Movimentação (Mockados)

Os tipos de movimentação serão definidos como constantes na aplicação:

```typescript
// Valores numéricos dos tipos
export const TIPO_MOVIMENTO = {
  ENTRADA: 1,                    // Aumenta estoque
  SAIDA: 2,                      // Diminui estoque
  ENVIAR_MOSTRUARIO: 3,          // Estoque → Mostruário
  RETORNAR_MOSTRUARIO: 4,        // Mostruário → Estoque
  DEVOLUCAO_CLIENTE: 5,          // Aumenta estoque
  DEVOLUCAO_FORNECEDOR: 6,       // Diminui estoque
  AJUSTE: 7,                     // Pode ser positivo ou negativo
  PERDA_AVARIA: 8,               // Diminui estoque
  TRANSFERENCIA_LOJAS: 'transfer_between_stores' // Transferência entre lojas
} as const;

// Descrições dos tipos
export const TIPO_MOVIMENTO_DESC = {
  1: 'Entrada',
  2: 'Saída',
  3: 'Enviar para Mostruário',
  4: 'Retornar do Mostruário',
  5: 'Devolução de Cliente',
  6: 'Devolução ao Fornecedor',
  7: 'Ajuste',
  8: 'Perda/Avaria',
  'transfer_between_stores': 'Transferência entre Lojas'
} as const;
```

## Estrutura de Arquivos a Criar

```
src/app/dashboard/estoque/
├── _constants/
│   └── tipo-movimento.ts          # Constantes dos tipos de movimentação
├── _schemas/
│   └── movimentacao-schema.ts      # Schemas Zod para validação
├── _data_access/
│   ├── create-entrada.ts            # Função pura para entradas
│   ├── create-saida.ts             # Função pura para saídas
│   ├── create-transferencia-mostruario.ts  # Função pura para transferências mostruário
│   ├── create-transferencia-lojas.ts       # Função pura para transferências entre lojas
│   ├── create-ajuste.ts            # Função pura para ajustes
│   ├── get-estoque-loja.ts         # Função pura para buscar estoque
│   └── index.ts                    # Exportações centralizadas
├── _actions/
│   ├── create-entrada.ts           # Server Action para entradas
│   ├── create-saida.ts             # Server Action para saídas
│   ├── create-transferencia-mostruario.ts  # Server Action para transferências mostruário
│   ├── create-transferencia-lojas.ts       # Server Action para transferências entre lojas
│   ├── create-ajuste.ts            # Server Action para ajustes
│   └── get-tipos-movimento.ts      # Server Action para buscar tipos disponíveis
└── page.tsx                        # Atualizar para usar novas Server Actions
```

## Implementação Detalhada

### 1. Constantes de Tipos de Movimentação

**Arquivo**: `src/app/dashboard/estoque/_constants/tipo-movimento.ts`

```typescript
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
```

### 2. Schemas de Validação Zod

**Arquivo**: `src/app/dashboard/estoque/_schemas/movimentacao-schema.ts`

```typescript
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
  direcao: z.enum(['positivo', 'negativo'], {
    errorMap: () => ({ message: "Direção deve ser 'positivo' ou 'negativo'" })
  }),
  motivo: z.string().optional(),
});

export type AjusteSchema = z.infer<typeof ajusteSchema>;
```

### 3. Data Access Layer

Todas as funções de data access devem ser **funções puras** que:
- Não fazem validação de autenticação
- Não retornam NextResponse
- Retornam dados diretamente ou lançam erros
- Têm tratamento de erros com valores padrão seguros

#### 3.1 create-entrada.ts

**Arquivo**: `src/app/dashboard/estoque/_data_access/create-entrada.ts`

```typescript
import prisma from "@/lib/prisma";

export interface CreateEntradaData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
  fornecedor_id?: number;
}

export async function createEntrada(data: CreateEntradaData) {
  if (!data.produto_id || !data.quantidade || !data.loja_id) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_id");
  }

  if (data.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  try {
    // Verificar se produto existe
    const produto = await prisma.produtos.findUnique({
      where: { id: data.produto_id }
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se loja existe
    const loja = await prisma.lojas.findUnique({
      where: { id: data.loja_id }
    });

    if (!loja) {
      throw new Error("Loja não encontrada");
    }

    // Buscar ou criar estoque_loja
    const estoqueAtual = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      }
    });

    const quantidadeEstoqueAtual = estoqueAtual?.quantidade_estoque || 0;
    const quantidadeDisponivelAtual = estoqueAtual?.quantidade_disponivel || 0;

    // Atualizar ou criar estoque_loja
    const estoqueAtualizado = await prisma.estoque_loja.upsert({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      },
      update: {
        quantidade_estoque: quantidadeEstoqueAtual + data.quantidade,
        quantidade_disponivel: quantidadeDisponivelAtual + data.quantidade,
      },
      create: {
        produto_id: data.produto_id,
        loja_id: data.loja_id,
        quantidade_estoque: data.quantidade,
        quantidade_disponivel: data.quantidade,
        quantidade_mostruario: 0,
      }
    });

    return {
      estoque: estoqueAtualizado,
      produto: {
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao
      }
    };
  } catch (err) {
    console.log("Erro ao criar entrada:", err);
    throw err;
  }
}
```

#### 3.2 create-saida.ts

**Arquivo**: `src/app/dashboard/estoque/_data_access/create-saida.ts`

```typescript
import prisma from "@/lib/prisma";

export interface CreateSaidaData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
}

export async function createSaida(data: CreateSaidaData) {
  if (!data.produto_id || !data.quantidade || !data.loja_id) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_id");
  }

  if (data.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  try {
    // Verificar se produto existe
    const produto = await prisma.produtos.findUnique({
      where: { id: data.produto_id }
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se loja existe
    const loja = await prisma.lojas.findUnique({
      where: { id: data.loja_id }
    });

    if (!loja) {
      throw new Error("Loja não encontrada");
    }

    // Buscar estoque atual
    const estoqueAtual = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      }
    });

    if (!estoqueAtual) {
      throw new Error("Produto não possui estoque nesta loja");
    }

    const quantidadeEstoqueAtual = estoqueAtual.quantidade_estoque || 0;
    const quantidadeDisponivelAtual = estoqueAtual.quantidade_disponivel || 0;

    // Verificar se tem estoque suficiente
    if (quantidadeDisponivelAtual < data.quantidade) {
      throw new Error(`Estoque insuficiente. Disponível: ${quantidadeDisponivelAtual}`);
    }

    // Atualizar estoque
    const estoqueAtualizado = await prisma.estoque_loja.update({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      },
      data: {
        quantidade_estoque: quantidadeEstoqueAtual - data.quantidade,
        quantidade_disponivel: quantidadeDisponivelAtual - data.quantidade,
      }
    });

    return {
      estoque: estoqueAtualizado,
      produto: {
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao
      }
    };
  } catch (err) {
    console.log("Erro ao criar saída:", err);
    throw err;
  }
}
```

#### 3.3 create-transferencia-mostruario.ts

**Arquivo**: `src/app/dashboard/estoque/_data_access/create-transferencia-mostruario.ts`

```typescript
import prisma from "@/lib/prisma";
import { TIPO_MOVIMENTO } from "../_constants/tipo-movimento";

export interface CreateTransferenciaMostruarioData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
  tipo_movimento: typeof TIPO_MOVIMENTO.ENVIAR_MOSTRUARIO | typeof TIPO_MOVIMENTO.RETORNAR_MOSTRUARIO;
}

export async function createTransferenciaMostruario(data: CreateTransferenciaMostruarioData) {
  if (!data.produto_id || !data.quantidade || !data.loja_id) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_id");
  }

  if (data.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  try {
    // Verificar se produto existe
    const produto = await prisma.produtos.findUnique({
      where: { id: data.produto_id }
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se loja existe
    const loja = await prisma.lojas.findUnique({
      where: { id: data.loja_id }
    });

    if (!loja) {
      throw new Error("Loja não encontrada");
    }

    // Buscar estoque atual
    const estoqueAtual = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      }
    });

    if (!estoqueAtual) {
      throw new Error("Produto não possui estoque nesta loja");
    }

    const quantidadeEstoqueAtual = estoqueAtual.quantidade_estoque || 0;
    const quantidadeMostruarioAtual = estoqueAtual.quantidade_mostruario || 0;

    let novaQuantidadeEstoque: number;
    let novaQuantidadeMostruario: number;

    if (data.tipo_movimento === TIPO_MOVIMENTO.ENVIAR_MOSTRUARIO) {
      // Estoque → Mostruário
      if (quantidadeEstoqueAtual < data.quantidade) {
        throw new Error(`Estoque insuficiente. Disponível: ${quantidadeEstoqueAtual}`);
      }
      novaQuantidadeEstoque = quantidadeEstoqueAtual - data.quantidade;
      novaQuantidadeMostruario = quantidadeMostruarioAtual + data.quantidade;
    } else {
      // Mostruário → Estoque
      if (quantidadeMostruarioAtual < data.quantidade) {
        throw new Error(`Mostruário insuficiente. Disponível: ${quantidadeMostruarioAtual}`);
      }
      novaQuantidadeEstoque = quantidadeEstoqueAtual + data.quantidade;
      novaQuantidadeMostruario = quantidadeMostruarioAtual - data.quantidade;
    }

    // Atualizar estoque
    const estoqueAtualizado = await prisma.estoque_loja.update({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      },
      data: {
        quantidade_estoque: novaQuantidadeEstoque,
        quantidade_mostruario: novaQuantidadeMostruario,
      }
    });

    return {
      estoque: estoqueAtualizado,
      produto: {
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao
      }
    };
  } catch (err) {
    console.log("Erro ao transferir mostruário:", err);
    throw err;
  }
}
```

#### 3.4 create-transferencia-lojas.ts

**Arquivo**: `src/app/dashboard/estoque/_data_access/create-transferencia-lojas.ts`

```typescript
import prisma from "@/lib/prisma";

export interface CreateTransferenciaLojasData {
  produto_id: number;
  quantidade: number;
  loja_origem: number;
  loja_destino: number;
}

export async function createTransferenciaLojas(data: CreateTransferenciaLojasData) {
  if (!data.produto_id || !data.quantidade || !data.loja_origem || !data.loja_destino) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_origem, loja_destino");
  }

  if (data.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  if (data.loja_origem === data.loja_destino) {
    throw new Error("A loja origem deve ser diferente da loja destino");
  }

  try {
    // Verificar se produto existe
    const produto = await prisma.produtos.findUnique({
      where: { id: data.produto_id }
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se lojas existem
    const [lojaOrigem, lojaDestino] = await Promise.all([
      prisma.lojas.findUnique({ where: { id: data.loja_origem } }),
      prisma.lojas.findUnique({ where: { id: data.loja_destino } })
    ]);

    if (!lojaOrigem) {
      throw new Error("Loja origem não encontrada");
    }

    if (!lojaDestino) {
      throw new Error("Loja destino não encontrada");
    }

    // Buscar estoque na loja origem
    const estoqueOrigem = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_origem
        }
      }
    });

    if (!estoqueOrigem) {
      throw new Error("Produto não possui estoque na loja origem");
    }

    const quantidadeDisponivelOrigem = estoqueOrigem.quantidade_disponivel || 0;

    if (quantidadeDisponivelOrigem < data.quantidade) {
      throw new Error(`Estoque insuficiente na loja origem. Disponível: ${quantidadeDisponivelOrigem}`);
    }

    // Buscar ou criar estoque na loja destino
    const estoqueDestino = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_destino
        }
      }
    });

    const quantidadeEstoqueOrigem = estoqueOrigem.quantidade_estoque || 0;
    const quantidadeDisponivelOrigemAtual = estoqueOrigem.quantidade_disponivel || 0;

    const quantidadeEstoqueDestino = estoqueDestino?.quantidade_estoque || 0;
    const quantidadeDisponivelDestino = estoqueDestino?.quantidade_disponivel || 0;

    // Executar transferência em transação
    const [estoqueOrigemAtualizado, estoqueDestinoAtualizado] = await prisma.$transaction([
      // Diminuir da loja origem
      prisma.estoque_loja.update({
        where: {
          produto_id_loja_id: {
            produto_id: data.produto_id,
            loja_id: data.loja_origem
          }
        },
        data: {
          quantidade_estoque: quantidadeEstoqueOrigem - data.quantidade,
          quantidade_disponivel: quantidadeDisponivelOrigemAtual - data.quantidade,
        }
      }),
      // Aumentar na loja destino
      prisma.estoque_loja.upsert({
        where: {
          produto_id_loja_id: {
            produto_id: data.produto_id,
            loja_id: data.loja_destino
          }
        },
        update: {
          quantidade_estoque: quantidadeEstoqueDestino + data.quantidade,
          quantidade_disponivel: quantidadeDisponivelDestino + data.quantidade,
        },
        create: {
          produto_id: data.produto_id,
          loja_id: data.loja_destino,
          quantidade_estoque: data.quantidade,
          quantidade_disponivel: data.quantidade,
          quantidade_mostruario: 0,
        }
      })
    ]);

    return {
      estoque_origem: estoqueOrigemAtualizado,
      estoque_destino: estoqueDestinoAtualizado,
      produto: {
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao
      }
    };
  } catch (err) {
    console.log("Erro ao transferir entre lojas:", err);
    throw err;
  }
}
```

#### 3.5 create-ajuste.ts

**Arquivo**: `src/app/dashboard/estoque/_data_access/create-ajuste.ts`

```typescript
import prisma from "@/lib/prisma";

export interface CreateAjusteData {
  produto_id: number;
  quantidade: number;
  loja_id: number;
  direcao: 'positivo' | 'negativo';
}

export async function createAjuste(data: CreateAjusteData) {
  if (!data.produto_id || !data.quantidade || !data.loja_id || !data.direcao) {
    throw new Error("Campos obrigatórios: produto_id, quantidade, loja_id, direcao");
  }

  if (data.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  try {
    // Verificar se produto existe
    const produto = await prisma.produtos.findUnique({
      where: { id: data.produto_id }
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se loja existe
    const loja = await prisma.lojas.findUnique({
      where: { id: data.loja_id }
    });

    if (!loja) {
      throw new Error("Loja não encontrada");
    }

    // Buscar ou criar estoque
    const estoqueAtual = await prisma.estoque_loja.findUnique({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      }
    });

    const quantidadeEstoqueAtual = estoqueAtual?.quantidade_estoque || 0;
    const quantidadeDisponivelAtual = estoqueAtual?.quantidade_disponivel || 0;

    let novaQuantidadeEstoque: number;
    let novaQuantidadeDisponivel: number;

    if (data.direcao === 'positivo') {
      // Ajuste positivo (aumenta)
      novaQuantidadeEstoque = quantidadeEstoqueAtual + data.quantidade;
      novaQuantidadeDisponivel = quantidadeDisponivelAtual + data.quantidade;
    } else {
      // Ajuste negativo (diminui)
      if (quantidadeDisponivelAtual < data.quantidade) {
        throw new Error(`Estoque insuficiente para ajuste negativo. Disponível: ${quantidadeDisponivelAtual}`);
      }
      novaQuantidadeEstoque = quantidadeEstoqueAtual - data.quantidade;
      novaQuantidadeDisponivel = quantidadeDisponivelAtual - data.quantidade;
    }

    // Atualizar ou criar estoque
    const estoqueAtualizado = await prisma.estoque_loja.upsert({
      where: {
        produto_id_loja_id: {
          produto_id: data.produto_id,
          loja_id: data.loja_id
        }
      },
      update: {
        quantidade_estoque: novaQuantidadeEstoque,
        quantidade_disponivel: novaQuantidadeDisponivel,
      },
      create: {
        produto_id: data.produto_id,
        loja_id: data.loja_id,
        quantidade_estoque: data.direcao === 'positivo' ? data.quantidade : 0,
        quantidade_disponivel: data.direcao === 'positivo' ? data.quantidade : 0,
        quantidade_mostruario: 0,
      }
    });

    return {
      estoque: estoqueAtualizado,
      produto: {
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao
      }
    };
  } catch (err) {
    console.log("Erro ao criar ajuste:", err);
    throw err;
  }
}
```

#### 3.6 get-estoque-loja.ts

**Arquivo**: `src/app/dashboard/estoque/_data_access/get-estoque-loja.ts`

```typescript
import prisma from "@/lib/prisma";

export async function getEstoqueLoja(lojaId: number) {
  if (!lojaId) {
    return [];
  }

  try {
    const estoque = await prisma.estoque_loja.findMany({
      where: {
        loja_id: lojaId
      },
      include: {
        produto: {
          select: {
            id: true,
            codigo: true,
            descricao: true,
            fornecedor: true,
            preco_venda: true
          }
        },
        loja_ref: {
          select: {
            id: true,
            nome: true
          }
        }
      },
      orderBy: {
        produto: {
          descricao: 'asc'
        }
      }
    });

    return estoque;
  } catch (err) {
    console.log("Erro ao buscar estoque da loja:", err);
    return [];
  }
}

export async function getEstoqueProduto(produtoId: number) {
  if (!produtoId) {
    return [];
  }

  try {
    const estoque = await prisma.estoque_loja.findMany({
      where: {
        produto_id: produtoId
      },
      include: {
        produto: {
          select: {
            id: true,
            codigo: true,
            descricao: true
          }
        },
        loja_ref: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });

    return estoque;
  } catch (err) {
    console.log("Erro ao buscar estoque do produto:", err);
    return [];
  }
}
```

### 4. Server Actions

Todas as Server Actions devem seguir o padrão do guia:
- Começar com `"use server"`
- Validar autenticação com `auth()`
- Validar dados com Zod usando `safeParse`
- Retornar `{ data }` ou `{ error }`
- Usar `revalidatePath` após mutações
- Tratar erros com try/catch

#### 4.1 create-entrada.ts

**Arquivo**: `src/app/dashboard/estoque/_actions/create-entrada.ts`

```typescript
"use server"

import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { entradaSchema, type EntradaSchema } from "../_schemas/movimentacao-schema"
import { createEntrada } from "../_data_access/create-entrada"

export async function createEntradaAction(formData: EntradaSchema) {
  // Verificar autenticação
  const session = await auth()
  
  if (!session?.user?.id) {
    return {
      error: "Não autorizado"
    }
  }

  // Validar dados
  const schema = entradaSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  // Executar operação
  try {
    const resultado = await createEntrada({
      produto_id: schema.data.produto_id,
      quantidade: schema.data.quantidade,
      loja_id: schema.data.loja_id,
      fornecedor_id: schema.data.fornecedor_id
    })

    // Revalidar cache
    revalidatePath("/dashboard/estoque")

    return {
      data: "Entrada de estoque registrada com sucesso!"
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Falha ao registrar entrada de estoque"
    }
  }
}
```

#### 4.2 create-saida.ts

**Arquivo**: `src/app/dashboard/estoque/_actions/create-saida.ts`

```typescript
"use server"

import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { saidaSchema, type SaidaSchema } from "../_schemas/movimentacao-schema"
import { createSaida } from "../_data_access/create-saida"

export async function createSaidaAction(formData: SaidaSchema) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return {
      error: "Não autorizado"
    }
  }

  const schema = saidaSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {
    await createSaida({
      produto_id: schema.data.produto_id,
      quantidade: schema.data.quantidade,
      loja_id: schema.data.loja_id
    })

    revalidatePath("/dashboard/estoque")

    return {
      data: "Saída de estoque registrada com sucesso!"
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Falha ao registrar saída de estoque"
    }
  }
}
```

#### 4.3 create-transferencia-mostruario.ts

**Arquivo**: `src/app/dashboard/estoque/_actions/create-transferencia-mostruario.ts`

```typescript
"use server"

import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { transferenciaMostruarioSchema, type TransferenciaMostruarioSchema } from "../_schemas/movimentacao-schema"
import { createTransferenciaMostruario } from "../_data_access/create-transferencia-mostruario"

export async function createTransferenciaMostruarioAction(formData: TransferenciaMostruarioSchema) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return {
      error: "Não autorizado"
    }
  }

  const schema = transferenciaMostruarioSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {
    await createTransferenciaMostruario({
      produto_id: schema.data.produto_id,
      quantidade: schema.data.quantidade,
      loja_id: schema.data.loja_id,
      tipo_movimento: schema.data.tipo_movimento
    })

    revalidatePath("/dashboard/estoque")

    return {
      data: "Transferência realizada com sucesso!"
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Falha ao realizar transferência"
    }
  }
}
```

#### 4.4 create-transferencia-lojas.ts

**Arquivo**: `src/app/dashboard/estoque/_actions/create-transferencia-lojas.ts`

```typescript
"use server"

import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { transferenciaLojasSchema, type TransferenciaLojasSchema } from "../_schemas/movimentacao-schema"
import { createTransferenciaLojas } from "../_data_access/create-transferencia-lojas"

export async function createTransferenciaLojasAction(formData: TransferenciaLojasSchema) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return {
      error: "Não autorizado"
    }
  }

  const schema = transferenciaLojasSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {
    await createTransferenciaLojas({
      produto_id: schema.data.produto_id,
      quantidade: schema.data.quantidade,
      loja_origem: schema.data.loja_origem,
      loja_destino: schema.data.loja_destino
    })

    revalidatePath("/dashboard/estoque")

    return {
      data: "Transferência entre lojas realizada com sucesso!"
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Falha ao realizar transferência entre lojas"
    }
  }
}
```

#### 4.5 create-ajuste.ts

**Arquivo**: `src/app/dashboard/estoque/_actions/create-ajuste.ts`

```typescript
"use server"

import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { ajusteSchema, type AjusteSchema } from "../_schemas/movimentacao-schema"
import { createAjuste } from "../_data_access/create-ajuste"

export async function createAjusteAction(formData: AjusteSchema) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return {
      error: "Não autorizado"
    }
  }

  const schema = ajusteSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {
    await createAjuste({
      produto_id: schema.data.produto_id,
      quantidade: schema.data.quantidade,
      loja_id: schema.data.loja_id,
      direcao: schema.data.direcao
    })

    revalidatePath("/dashboard/estoque")

    return {
      data: "Ajuste de estoque realizado com sucesso!"
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Falha ao realizar ajuste de estoque"
    }
  }
}
```

#### 4.6 get-tipos-movimento.ts

**Arquivo**: `src/app/dashboard/estoque/_actions/get-tipos-movimento.ts`

```typescript
"use server"

import { auth } from "@/lib/auth"
import { getTiposMovimento } from "../_constants/tipo-movimento"

export async function getTiposMovimentoAction() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return {
      error: "Não autorizado"
    }
  }

  try {
    const tipos = getTiposMovimento()
    return {
      data: tipos
    }
  } catch (err) {
    return {
      error: "Falha ao buscar tipos de movimentação"
    }
  }
}
```

### 5. Atualizar index.ts

**Arquivo**: `src/app/dashboard/estoque/_data_access/index.ts`

```typescript
// Exportações de Data Access
export { createEntrada } from './create-entrada'
export type { CreateEntradaData } from './create-entrada'

export { createSaida } from './create-saida'
export type { CreateSaidaData } from './create-saida'

export { createTransferenciaMostruario } from './create-transferencia-mostruario'
export type { CreateTransferenciaMostruarioData } from './create-transferencia-mostruario'

export { createTransferenciaLojas } from './create-transferencia-lojas'
export type { CreateTransferenciaLojasData } from './create-transferencia-lojas'

export { createAjuste } from './create-ajuste'
export type { CreateAjusteData } from './create-ajuste'

export { getEstoqueLoja, getEstoqueProduto } from './get-estoque-loja'

// Manter exports antigos para compatibilidade (se necessário)
export { getEstoque, getMovimentacoesEstoque, getEstoqueBaixo, getResumoEstoque } from './get-estoque'
export type { EstoqueItem, MovimentacaoEstoque } from './get-estoque'
```

## Checklist de Implementação

- [ ] Criar `_constants/tipo-movimento.ts` com constantes mockadas
- [ ] Criar `_schemas/movimentacao-schema.ts` com todos os schemas Zod
- [ ] Criar `_data_access/create-entrada.ts`
- [ ] Criar `_data_access/create-saida.ts`
- [ ] Criar `_data_access/create-transferencia-mostruario.ts`
- [ ] Criar `_data_access/create-transferencia-lojas.ts`
- [ ] Criar `_data_access/create-ajuste.ts`
- [ ] Criar `_data_access/get-estoque-loja.ts`
- [ ] Criar `_actions/create-entrada.ts`
- [ ] Criar `_actions/create-saida.ts`
- [ ] Criar `_actions/create-transferencia-mostruario.ts`
- [ ] Criar `_actions/create-transferencia-lojas.ts`
- [ ] Criar `_actions/create-ajuste.ts`
- [ ] Criar `_actions/get-tipos-movimento.ts`
- [ ] Atualizar `_data_access/index.ts` com novas exportações
- [ ] Testar todas as operações

## Observações Finais

1. **Todas as operações atualizam apenas `estoque_loja`**
2. **Não há mais histórico de movimentações** (entrada_estoque foi removida)
3. **Tipos de movimentação são mockados** (constantes na aplicação)
4. **Seguir estritamente o padrão do GUIA_DE_BOAS_PRATICAS.md**
5. **Todas as Server Actions devem validar autenticação**
6. **Todas as Server Actions devem usar Zod para validação**
7. **Todas as Server Actions devem retornar `{ data }` ou `{ error }`**
8. **Todas as Server Actions devem usar `revalidatePath` após mutações**

---

**Última atualização**: Janeiro 2025

