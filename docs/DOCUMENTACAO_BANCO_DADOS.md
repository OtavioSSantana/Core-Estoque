# Documentação do Banco de Dados - Core Estoque

Este documento descreve todas as tabelas do banco de dados e suas relações.

## Índice

1. [Tabelas Principais](#tabelas-principais)
2. [Relações entre Tabelas](#relações-entre-tabelas)
3. [Diagrama de Relações](#diagrama-de-relações)
4. [Descrição Detalhada das Tabelas](#descrição-detalhada-das-tabelas)

---

## Tabelas Principais

O banco de dados contém **5 tabelas principais**:

1. `produtos` - Cadastro de produtos
2. `lojas` - Cadastro de lojas
3. `estoque_loja` - Estoque de produtos por loja
4. `usuarios` - Cadastro de usuários do sistema
5. `setor` - Setores/Departamentos (referência)

**Observação**: As tabelas `entrada_estoque` e `tipo_movimento` foram removidas do schema. O estoque agora é gerenciado exclusivamente através da tabela `estoque_loja`.

---

## Relações entre Tabelas

### Diagrama de Relações

```
┌─────────────┐
│  produtos   │
│─────────────│
│ id (PK)     │◄──────┐
│ codigo (UK) │       │
│ descricao   │       │
│ fornecedor  │       │
│ preco_venda │       │
└─────────────┘       │
       │              │
       │ 1:N          │
       │              │
       ▼              │
┌─────────────┐       │
│estoque_loja │       │
│─────────────│       │
│ id (PK)     │       │
│ produto_id  │───────┘
│ loja_id     │───────┐
│ qtd_estoque │       │
│ qtd_mostru  │       │
│ qtd_disp    │       │
└─────────────┘       │
       │              │
       │ N:1          │
       │              │
       ▼              ▼
┌─────────────┐  ┌─────────────┐
│   lojas     │  │  usuarios    │
│─────────────│  │─────────────│
│ id (PK)     │  │ id (PK)     │
│ nome        │  │ nome        │
│ endereco    │  │ login       │
│ gerente     │  │ senha       │
│ qtd_total   │  │ setor       │────┐
└─────────────┘  │ loja        │   │
                 │ inativo     │   │
                 │ email       │   │
                 └─────────────┘   │
                        │           │
                        │           │
                 ┌──────▼───────────▼──┐
                 │      setor         │
                 │────────────────────│
                 │ id (PK)            │
                 │ descricao          │
                 └─────────────────────┘
```

---

## Descrição Detalhada das Tabelas

### 1. `produtos`

Tabela principal que armazena informações dos produtos cadastrados no sistema.

**Campos:**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | Int | Identificador único | PK, Auto Increment |
| `codigo` | String(60) | Código do produto | UNIQUE, NOT NULL |
| `descricao` | String | Descrição do produto | NULLABLE |
| `fornecedor` | String(80) | Nome do fornecedor | NULLABLE |
| `preco_venda` | Decimal(18,2) | Preço de venda | NOT NULL |

**Relações:**

- **1:N** com `estoque_loja` (um produto pode estar em várias lojas)

**Observações:**

- O `codigo` é único e obrigatório
- As quantidades de estoque (`quantidade_estoque`, `quantidade_mostruario`, `quantidade_disponivel`) foram removidas desta tabela e agora são mantidas exclusivamente em `estoque_loja`
- Esta mudança elimina a duplicação de dados e centraliza o controle de estoque por loja

---

### 2. `lojas`

Tabela que armazena informações das lojas/filiais do sistema.

**Campos:**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | Int | Identificador único | PK, Auto Increment |
| `nome` | String(80) | Nome da loja | NULLABLE |
| `endereco` | String | Endereço da loja | NULLABLE |
| `gerente` | Int | ID do gerente (referência a usuarios) | NULLABLE |
| `qtd_total_prod` | Int | Quantidade total de produtos | NULLABLE |

**Relações:**

- **1:N** com `estoque_loja` (uma loja pode ter vários produtos em estoque)

**Observações:**

- O campo `gerente` é uma referência a `usuarios.id`, mas não há foreign key definida no schema
- O campo `qtd_total_prod` parece ser um campo calculado/demoninado

---

### 3. `estoque_loja`

Tabela que armazena o estoque específico de cada produto por loja. Esta é a tabela central para controle de estoque.

**Campos:**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | Int | Identificador único | PK, Auto Increment |
| `produto_id` | Int | Referência ao produto | FK → produtos.id |
| `loja_id` | Int | Referência à loja | FK → lojas.id |
| `quantidade_estoque` | Int | Quantidade em estoque na loja | DEFAULT 0 |
| `quantidade_mostruario` | Int | Quantidade em mostruário na loja | DEFAULT 0 |
| `quantidade_disponivel` | Int | Quantidade disponível na loja | DEFAULT 0 |

**Relações:**

- **N:1** com `produtos` (muitos registros de estoque para um produto)
- **N:1** com `lojas` (muitos registros de estoque para uma loja)

**Constraints:**

- **UNIQUE** na combinação `(produto_id, loja_id)` - cada produto só pode ter um registro por loja

**Observações:**

- Esta tabela é agora a única fonte de verdade para quantidades de estoque
- Mantém três quantidades: estoque total, mostruário e disponível
- Permite controle granular de estoque por loja
- Todas as movimentações devem atualizar esta tabela

---

### 4. `usuarios`

Tabela que armazena informações dos usuários do sistema.

**Campos:**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | Int | Identificador único | PK, Auto Increment |
| `nome` | String(50) | Nome do usuário | NULLABLE |
| `login` | String(40) | Login do usuário | NULLABLE |
| `senha` | Int | Senha (hash ou número) | NULLABLE |
| `setor` | Int | Referência ao setor | NULLABLE |
| `loja` | Int | Referência à loja | NULLABLE |
| `inativo` | Boolean | Status do usuário | DEFAULT false |
| `email` | String | Email do usuário | NULLABLE |

**Relações:**

- Referência a `setor` (via `setor` → `setor.id`) - **sem FK definida**
- Referência a `lojas` (via `loja` → `lojas.id`) - **sem FK definida**
- Referência em `lojas.gerente` (via `lojas.gerente` → `usuarios.id`) - **sem FK definida**

**Observações:**

- Usado para autenticação no sistema (NextAuth)
- A senha pode ser armazenada como hash (string) ou número (legado)
- Não há foreign keys explícitas, mas há relações lógicas

---

### 5. `setor`

Tabela que armazena os setores/departamentos do sistema.

**Campos:**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | Int | Identificador único | PK, Auto Increment |
| `descricao` | String(60) | Descrição do setor | NULLABLE |

**Relações:**

- **1:N** com `usuarios` (via `usuarios.setor`)

**Observações:**

- Tabela de referência simples
- Usada para categorizar usuários por setor/departamento

---

## Resumo das Relações

### Relações com Foreign Keys Definidas

1. **`estoque_loja.produto_id` → `produtos.id`**
   - Constraint: Padrão do Prisma

2. **`estoque_loja.loja_id` → `lojas.id`**
   - Constraint: Padrão do Prisma

### Relações Lógicas (sem Foreign Keys)

1. **`usuarios.setor` → `setor.id`**
   - Referência lógica, não há FK no schema

2. **`usuarios.loja` → `lojas.id`**
   - Referência lógica, não há FK no schema

3. **`lojas.gerente` → `usuarios.id`**
   - Referência lógica, não há FK no schema

---

## Mudanças Significativas no Schema

### Tabelas Removidas

1. **`entrada_estoque`**: Tabela de histórico de movimentações foi removida
   - **Impacto**: Não há mais registro histórico de movimentações no banco
   - **Alternativa**: Histórico pode ser mantido em logs ou tabela separada se necessário

2. **`tipo_movimento`**: Tabela de tipos de movimentação foi removida
   - **Impacto**: Tipos de movimentação devem ser gerenciados na aplicação
   - **Alternativa**: Enums ou constantes no código podem ser usados

### Campos Removidos de `produtos`

- `quantidade_mostruario`
- `quantidade_estoque`
- `quantidade_disponivel`

**Impacto**: Todas as quantidades agora são gerenciadas exclusivamente em `estoque_loja`, eliminando duplicação de dados.

---

## Observações Importantes

1. **Centralização de Estoque**: O estoque é agora gerenciado exclusivamente em `estoque_loja`. Isso elimina problemas de sincronização entre tabelas.

2. **Sem Histórico de Movimentações**: Com a remoção de `entrada_estoque`, não há mais registro automático de histórico de movimentações. Se necessário, deve ser implementado separadamente.

3. **Tipos de Movimentação**: Com a remoção de `tipo_movimento`, os tipos devem ser definidos na aplicação (enums, constantes, etc.).

4. **Foreign Keys Ausentes**: Várias relações são lógicas, mas não têm foreign keys definidas no schema. Isso pode causar problemas de integridade referencial.

5. **Índices**: A tabela `estoque_loja` tem um índice único composto em `(produto_id, loja_id)`, garantindo que não haja duplicatas.

6. **Estrutura Simplificada**: A estrutura está mais simples e focada, com estoque centralizado por loja.

---

**Última atualização**: Janeiro 2025
**Versão do Schema**: Schema atualizado (sem entrada_estoque e tipo_movimento)
