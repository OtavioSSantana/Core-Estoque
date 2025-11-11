# Plano de Execução Detalhado - Integração Tiny ERP (Olist)

## 📋 Visão Geral

**Objetivo:** Integrar o sistema com a API do Tiny ERP para receber automaticamente pedidos de venda e seus itens, associando cada pedido à loja do vendedor e permitindo baixa automática de estoque.

**Tempo Estimado:** 2-3 horas  
**Complexidade:** Média  
**Data de Criação:** 2024

---

## 🎯 Objetivos da Integração

1. ✅ Sincronizar pedidos do Tiny ERP automaticamente via cron job
2. ✅ Associar pedidos à loja do vendedor automaticamente
3. ✅ Sincronizar itens de cada pedido
4. ✅ Permitir processamento de pedidos (baixa de estoque)
5. ✅ Interface para visualizar e gerenciar pedidos

---

## 📦 Fase 1: Preparação do Banco de Dados

### 1.1 Atualizar Schema do Prisma

**Arquivo:** `prisma/schema.prisma`

**Ações necessárias:**

1. **Adicionar campo `id_vendedor_tiny` no model `usuarios`**
   ```prisma
   model usuarios {
     id              Int      @id @default(autoincrement())
     nome            String?  @db.VarChar(50)
     login           String?  @db.VarChar(40)
     senha           Int?
     setor           Int?
     loja            Int?
     inativo         Boolean? @default(false)
     email           String?
     id_vendedor_tiny String? @unique @db.VarChar(50)  // NOVO CAMPO
   }
   ```

2. **Adicionar novos models `pedidos` e `itens_pedido`**
   ```prisma
   model pedidos {
     id                  Int              @id @default(autoincrement())
     codigo_tiny         String?          @unique @db.VarChar(100)
     numero              String?          @db.VarChar(50)
     data_pedido         DateTime?
     data_atualizacao    DateTime         @updatedAt
     status              String?          @db.VarChar(50)
     cliente_nome        String?          @db.VarChar(200)
     valor_total         Decimal?         @db.Decimal(18, 2)
     id_vendedor         String?          @db.VarChar(50)
     nome_vendedor       String?          @db.VarChar(200)
     situacao            String?          @db.VarChar(100)
     loja_id             Int?
     sincronizado_em     DateTime?
     itens               itens_pedido[]
     loja_ref            lojas?           @relation(fields: [loja_id], references: [id])
     
     @@index([codigo_tiny])
     @@index([status])
     @@index([data_pedido])
     @@index([situacao])
   }

   model itens_pedido {
     id                  Int              @id @default(autoincrement())
     pedido_id           Int
     produto_id           Int?
     codigo_produto_tiny  String?         @db.VarChar(100)
     descricao           String?          @db.VarChar(500)
     quantidade          Decimal          @db.Decimal(18, 2)
     valor_unitario      Decimal          @db.Decimal(18, 2)
     valor_total          Decimal          @db.Decimal(18, 2)
     pedido              pedidos          @relation(fields: [pedido_id], references: [id], onDelete: Cascade)
     produto             produtos?        @relation(fields: [produto_id], references: [id])
     
     @@index([pedido_id])
     @@index([produto_id])
     @@index([codigo_produto_tiny])
   }
   ```

3. **Adicionar relação no model `produtos`**
   ```prisma
   model produtos {
     id                    Int               @id @default(autoincrement())
     codigo                String            @unique @db.VarChar(60)
     descricao             String?
     fornecedor            String?           @db.VarChar(80)
     preco_venda           Decimal           @db.Decimal(18, 2)
     estoque_por_loja      estoque_loja[]
     itens_pedido          itens_pedido[]    // NOVA RELAÇÃO
   }
   ```

4. **Adicionar relação no model `lojas`**
   ```prisma
   model lojas {
     id             Int     @id @default(autoincrement())
     nome           String? @db.VarChar(80)
     endereco       String?
     gerente        Int?
     qtd_total_prod Int?
     estoque_por_loja estoque_loja[]
     pedidos        pedidos[]  // NOVA RELAÇÃO
   }
   ```

**Comandos a executar:**
```bash
# Gerar migração
npx prisma migrate dev --name add_pedidos_e_vendedor_tiny

# Gerar cliente Prisma
npx prisma generate
```

**Checklist:**
- [ ] Schema atualizado com todos os campos
- [ ] Migração criada e aplicada com sucesso
- [ ] Cliente Prisma regenerado
- [ ] Verificar se não há erros de sintaxe
- [ ] Testar conexão com banco de dados

**Tempo estimado:** 15 minutos

---

## 🔧 Fase 2: Criação de Utilitários e Helpers

### 2.1 Criar função para determinar loja pelo vendedor

**Arquivo:** `src/app/api/tiny/sync/utils/determinar-loja.ts` (NOVO)

**Funcionalidade:** Busca a loja associada ao vendedor através do `id_vendedor_tiny`

**Estrutura:**
```typescript
import { prisma } from '@/lib/prisma';

interface PedidoTiny {
  id_vendedor?: string;
  nome_vendedor?: string;
}

export async function determinarLojaPedido(
  pedido: PedidoTiny
): Promise<number | null> {
  // 1. Buscar usuário pelo id_vendedor_tiny
  // 2. Fallback: buscar pelo nome
  // 3. Fallback: loja padrão
  // 4. Retornar null se não encontrar
}
```

**Lógica de prioridade:**
1. Buscar por `id_vendedor_tiny` (mais confiável)
2. Buscar por nome do vendedor (menos confiável)
3. Usar loja padrão configurada em variável de ambiente
4. Retornar `null` se nenhuma opção funcionar

**Checklist:**
- [ ] Arquivo criado na estrutura correta
- [ ] Função implementada com todos os fallbacks
- [ ] Tratamento de erros implementado
- [ ] Logs para debug adicionados
- [ ] Testada localmente

**Tempo estimado:** 20 minutos

---

### 2.2 Criar função para processar XML

**Arquivo:** `src/app/api/tiny/sync/utils/xml-parser.ts` (NOVO)

**Opções de implementação:**

**Opção 1: Usar biblioteca xml2js (Recomendado)**
```bash
npm install xml2js @types/xml2js
```

```typescript
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

export async function xmlToJson(xmlString: string): Promise<any> {
  try {
    const result = await parseXML(xmlString);
    return result;
  } catch (error) {
    console.error('Erro ao parsear XML:', error);
    throw error;
  }
}
```

**Opção 2: Parser simples (sem dependências)**
```typescript
// Implementação básica de parser XML
export function xmlToJson(xmlString: string): any {
  // Parser simples usando DOMParser ou regex
}
```

**Checklist:**
- [ ] Decisão sobre qual opção usar
- [ ] Biblioteca instalada (se necessário)
- [ ] Função de parsing criada
- [ ] Testada com XML de exemplo da API Tiny
- [ ] Tratamento de erros implementado

**Tempo estimado:** 15 minutos

---

### 2.3 Criar função para buscar itens do pedido

**Arquivo:** `src/app/api/tiny/sync/utils/buscar-itens-pedido.ts` (NOVO)

**Funcionalidade:** Busca os itens de um pedido específico na API do Tiny

**Endpoint da API:**
```
https://api.tiny.com.br/api2/pedido.obter.php?token={token}&id={pedido_id}&formato=json
```

**Estrutura:**
```typescript
export async function buscarItensPedido(pedidoId: string): Promise<any[]> {
  // 1. Validar token
  // 2. Fazer requisição para API
  // 3. Processar resposta (JSON ou XML)
  // 4. Extrair array de itens
  // 5. Retornar itens formatados
}
```

**Tratamento de resposta:**
- Se retornar JSON: processar diretamente
- Se retornar XML: usar função xmlToJson
- Se houver erro: retornar array vazio e logar erro

**Checklist:**
- [ ] Função criada
- [ ] Integração com API Tiny implementada
- [ ] Processamento de JSON/XML implementado
- [ ] Tratamento de erros robusto
- [ ] Testada com ID real de pedido

**Tempo estimado:** 20 minutos

---

## 🌐 Fase 3: Criação das APIs

### 3.1 Criar endpoint de sincronização

**Arquivo:** `src/app/api/tiny/sync/route.ts` (NOVO)

**Endpoint:** `GET /api/tiny/sync`

**Funcionalidades:**
1. Validação de autenticação (cron secret)
2. Buscar pedidos da API Tiny
3. Para cada pedido:
   - Verificar se já existe
   - Determinar loja pelo vendedor
   - Buscar itens do pedido
   - Criar ou atualizar pedido
   - Criar ou atualizar itens
4. Retornar resumo da sincronização

**Estrutura do código:**
```typescript
export async function GET(request: NextRequest) {
  // 1. Validar autenticação
  // 2. Buscar pedidos da API Tiny
  // 3. Processar cada pedido
  // 4. Retornar resumo
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "resumo": {
    "total_encontrados": 10,
    "processados": 10,
    "novos": 5,
    "atualizados": 5,
    "erros": 0
  },
  "message": "Sincronização concluída: 5 novos, 5 atualizados"
}
```

**Checklist:**
- [ ] Endpoint criado
- [ ] Validação de autenticação implementada
- [ ] Integração com API Tiny funcionando
- [ ] Processamento de pedidos implementado
- [ ] Processamento de itens implementado
- [ ] Tratamento de erros robusto
- [ ] Logs detalhados para debug
- [ ] Idempotência garantida (não duplicar pedidos)

**Tempo estimado:** 45 minutos

---

### 3.2 Criar endpoint para processar pedido (baixar estoque)

**Arquivo:** `src/app/api/tiny/pedidos/[id]/processar/route.ts` (NOVO)

**Endpoint:** `POST /api/tiny/pedidos/{id}/processar`

**Funcionalidades:**
1. Buscar pedido e seus itens
2. Validar se pedido tem loja definida
3. Para cada item:
   - Verificar se produto está mapeado
   - Validar estoque disponível na loja
4. Se tudo OK: descontar estoque em transação
5. Atualizar status do pedido para "processado"

**Validações:**
- Pedido deve existir
- Pedido deve ter loja_id definido
- Todos os itens devem ter estoque suficiente
- Produtos devem estar mapeados (opcional, pode processar sem mapeamento)

**Integração:**
- Usar função `createSaida` existente para descontar estoque

**Checklist:**
- [ ] Endpoint criado
- [ ] Validação de estoque implementada
- [ ] Integração com createSaida
- [ ] Transação implementada (tudo ou nada)
- [ ] Tratamento de erros
- [ ] Mensagens de erro claras

**Tempo estimado:** 30 minutos

---

### 3.3 Criar endpoint para listar pedidos

**Arquivo:** `src/app/api/tiny/pedidos/route.ts` (NOVO)

**Endpoint:** `GET /api/tiny/pedidos`

**Funcionalidades:**
- Listar pedidos com paginação
- Filtros: status, loja, data inicial, data final
- Incluir itens do pedido
- Incluir informações da loja

**Query parameters:**
- `page`: número da página
- `pageSize`: itens por página
- `status`: filtrar por status
- `loja_id`: filtrar por loja
- `data_inicio`: data inicial
- `data_fim`: data final

**Resposta:**
```json
{
  "pedidos": [...],
  "meta": {
    "total": 100",
    "page": 1,
    "pageSize": 20,
    "totalPages": 5
  }
}
```

**Checklist:**
- [ ] Endpoint GET criado
- [ ] Paginação implementada
- [ ] Filtros implementados
- [ ] Relações (itens, loja) incluídas
- [ ] Performance otimizada

**Tempo estimado:** 30 minutos

---

## ⚙️ Fase 4: Configuração do Cron Job

### 4.1 Criar arquivo vercel.json

**Arquivo:** `vercel.json` (NOVO na raiz do projeto)

**Conteúdo:**
```json
{
  "crons": [
    {
      "path": "/api/tiny/sync",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

**Opções de schedule:**
- `*/5 * * * *` - A cada 5 minutos
- `*/15 * * * *` - A cada 15 minutos (recomendado)
- `0 * * * *` - A cada hora
- `0 */6 * * *` - A cada 6 horas

**Checklist:**
- [ ] Arquivo criado na raiz
- [ ] Schedule configurado conforme necessidade
- [ ] Path do endpoint correto

**Tempo estimado:** 5 minutos

---

### 4.2 Configurar variáveis de ambiente

**Arquivo:** `.env.local` (atualizar)

**Variáveis necessárias:**
```env
# Token da API Tiny
TINY_API_TOKEN=3859d6b77a831408b603f33fa88a04d1f141d0504882f2b4b23481fcdae6d945

# Loja padrão para pedidos sem vendedor mapeado
LOJA_PADRAO_PEDIDOS=1

# Secret para proteger endpoint de cron
CRON_SECRET=seu_secret_aleatorio_aqui_gerar_com_openssl_rand_hex_32
```

**Ações na Vercel:**
1. Acessar Dashboard Vercel
2. Selecionar projeto
3. Settings → Environment Variables
4. Adicionar cada variável:
   - `TINY_API_TOKEN`
   - `LOJA_PADRAO_PEDIDOS`
   - `CRON_SECRET`
5. Aplicar para todos os ambientes (Production, Preview, Development)

**Gerar CRON_SECRET:**
```bash
# Opção 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Opção 2: OpenSSL
openssl rand -hex 32
```

**Checklist:**
- [ ] Variáveis adicionadas no .env.local
- [ ] Variáveis adicionadas na Vercel (Production)
- [ ] Variáveis adicionadas na Vercel (Preview)
- [ ] Variáveis adicionadas na Vercel (Development)
- [ ] CRON_SECRET gerado de forma segura

**Tempo estimado:** 10 minutos

---

## 🎨 Fase 5: Interface do Usuário

### 5.1 Atualizar tela de usuários

**Arquivo:** `src/app/dashboard/usuarios/page.tsx` (ATUALIZAR)

**Ações:**
1. Adicionar campo `id_vendedor_tiny` no formulário de criação/edição
2. Adicionar coluna opcional na tabela para exibir o ID
3. Atualizar estado do formulário

**Campo a adicionar:**
```tsx
<Input
  label="ID Vendedor Tiny"
  value={formData.id_vendedor_tiny || ''}
  onChange={(e) => setFormData({ ...formData, id_vendedor_tiny: e.target.value })}
  placeholder="Ex: 737264138"
  helperText="ID do vendedor no sistema Tiny (Olist). Usado para associar pedidos à loja."
/>
```

**Checklist:**
- [ ] Campo adicionado no formulário de criação
- [ ] Campo adicionado no formulário de edição
- [ ] Estado do formulário atualizado
- [ ] Validação implementada (opcional)
- [ ] Interface testada

**Tempo estimado:** 20 minutos

---

### 5.2 Atualizar data access de usuários

**Arquivo:** `src/app/dashboard/usuarios/_data_access/create-usuarios.ts` (ATUALIZAR)

**Ações:**
1. Adicionar `id_vendedor_tiny` no interface `CreateUsuarioData`
2. Incluir no create do Prisma
3. Validar formato (opcional)

```typescript
export interface CreateUsuarioData {
  // ... campos existentes
  id_vendedor_tiny?: string;
}

// No create:
id_vendedor_tiny: data.id_vendedor_tiny?.trim() || null,
```

**Arquivo:** `src/app/dashboard/usuarios/_data_access/update-usuarios.ts` (ATUALIZAR)

**Ações:**
1. Adicionar `id_vendedor_tiny` no interface
2. Incluir no update do Prisma

**Arquivo:** `src/app/dashboard/usuarios/_data_access/get-usuarios.ts` (ATUALIZAR)

**Ações:**
1. Incluir `id_vendedor_tiny` no select
2. Retornar no formato de resposta

**Checklist:**
- [ ] Create atualizado
- [ ] Update atualizado
- [ ] Get atualizado
- [ ] Testes realizados
- [ ] Dados sendo salvos corretamente

**Tempo estimado:** 20 minutos

---

### 5.3 Criar tela de pedidos

**Arquivo:** `src/app/dashboard/pedidos/page.tsx` (NOVO)

**Funcionalidades:**
- Listar pedidos sincronizados com paginação
- Filtros: status, loja, data
- Visualizar detalhes do pedido (modal)
- Listar itens de cada pedido
- Botão para processar pedido (baixar estoque)
- Status visual (badges coloridos)
- Indicador de loja

**Componentes necessários:**
- Tabela de pedidos
- Modal de detalhes
- Filtros
- Botão de ação (processar)
- Loading states
- Mensagens de erro/sucesso

**Estrutura básica:**
```tsx
export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({...});
  
  // Fetch pedidos
  // Handle processar pedido
  // Render
}
```

**Checklist:**
- [ ] Tela criada
- [ ] Listagem implementada
- [ ] Paginação funcionando
- [ ] Filtros implementados
- [ ] Modal de detalhes criado
- [ ] Botão processar implementado
- [ ] Feedback visual (toast)
- [ ] Loading states
- [ ] Tratamento de erros

**Tempo estimado:** 1 hora

---

### 5.4 Criar data access de pedidos

**Arquivo:** `src/app/dashboard/pedidos/_data_access/get-pedidos.ts` (NOVO)

**Funcionalidade:** Buscar pedidos com filtros e paginação

**Arquivo:** `src/app/dashboard/pedidos/_data_access/processar-pedido.ts` (NOVO)

**Funcionalidade:** Chamar API para processar pedido

**Checklist:**
- [ ] Get pedidos criado
- [ ] Processar pedido criado
- [ ] Integração com API funcionando
- [ ] Tratamento de erros

**Tempo estimado:** 15 minutos

---

## 📜 Fase 6: Scripts Auxiliares

### 6.1 Script para mapear vendedores existentes

**Arquivo:** `scripts/mapear-vendedores-tiny.ts` (NOVO)

**Funcionalidade:** Mapear vendedores já cadastrados baseado no nome

**Estrutura:**
```typescript
import { prisma } from '../src/lib/prisma';

// Mapeamento manual de vendedores conhecidos
const mapeamentoVendedores: Record<string, string> = {
  '737264138': 'Gabriel Ricardo',
  // Adicionar outros conforme necessário
};

async function mapearVendedores() {
  // Para cada vendedor no mapeamento:
  // 1. Buscar usuário pelo nome
  // 2. Atualizar campo id_vendedor_tiny
}
```

**Checklist:**
- [ ] Script criado
- [ ] Mapeamento configurado
- [ ] Testado localmente
- [ ] Documentado como usar

**Tempo estimado:** 15 minutos

---

### 6.2 Script de teste de sincronização

**Arquivo:** `scripts/test-sync-tiny.ts` (NOVO)

**Funcionalidade:** Testar sincronização localmente sem cron

**Checklist:**
- [ ] Script criado
- [ ] Testes realizados
- [ ] Logs detalhados

**Tempo estimado:** 10 minutos

---

## ✅ Fase 7: Testes e Validação

### 7.1 Testes Locais

**Ações a realizar:**

1. **Testar função determinarLojaPedido**
   ```typescript
   // Criar teste unitário ou script de teste
   const loja = await determinarLojaPedido({
     id_vendedor: '737264138',
     nome_vendedor: 'Gabriel Ricardo'
   });
   console.log('Loja encontrada:', loja);
   ```

2. **Testar busca de pedidos na API Tiny**
   ```bash
   curl "https://api.tiny.com.br/api2/pedidos.pesquisa.php?token=SEU_TOKEN&formato=json"
   ```

3. **Testar processamento de XML/JSON**
   - Testar com resposta real da API
   - Verificar parsing correto

4. **Testar salvamento no banco**
   - Verificar se pedidos estão sendo salvos
   - Verificar se itens estão sendo salvos
   - Verificar relacionamentos

5. **Testar endpoint de sincronização manualmente**
   ```bash
   curl http://localhost:3000/api/tiny/sync \
     -H "Authorization: Bearer seu_secret_aqui"
   ```

6. **Testar processamento de pedido (baixa estoque)**
   - Criar pedido de teste
   - Processar pedido
   - Verificar se estoque foi descontado

**Comandos úteis:**
```bash
# Verificar logs
# Verificar banco de dados
npx prisma studio

# Testar endpoint
npm run dev
# Acessar http://localhost:3000/api/tiny/sync
```

**Checklist:**
- [ ] Função determinarLoja testada
- [ ] API Tiny respondendo corretamente
- [ ] Dados sendo salvos corretamente
- [ ] Erros sendo tratados adequadamente
- [ ] Performance aceitável

**Tempo estimado:** 30 minutos

---

### 7.2 Testes na Vercel

**Ações a realizar:**

1. **Fazer deploy**
   ```bash
   git add .
   git commit -m "feat: integração com Tiny ERP"
   git push origin main
   ```

2. **Verificar variáveis de ambiente**
   - Dashboard Vercel → Settings → Environment Variables
   - Confirmar que todas estão configuradas

3. **Testar endpoint manualmente**
   - Usar Postman ou curl
   - Verificar resposta

4. **Verificar logs na Vercel**
   - Dashboard → Functions → Logs
   - Verificar se há erros

5. **Aguardar execução do cron**
   - Verificar se cron está agendado
   - Aguardar próxima execução
   - Verificar logs

6. **Verificar pedidos sincronizados**
   - Acessar banco de dados
   - Verificar tabela pedidos
   - Verificar tabela itens_pedido

**Checklist:**
- [ ] Deploy realizado com sucesso
- [ ] Variáveis de ambiente configuradas
- [ ] Endpoint acessível e funcionando
- [ ] Cron job configurado e executando
- [ ] Dados sendo salvos corretamente
- [ ] Logs sem erros críticos

**Tempo estimado:** 20 minutos

---

## 📚 Fase 8: Documentação

### 8.1 Documentar integração

**Arquivo:** `docs/DOCUMENTACAO_INTEGRACAO_TINY.md` (NOVO)

**Conteúdo a incluir:**

1. **Visão Geral**
   - O que é a integração
   - Objetivos
   - Fluxo geral

2. **Configuração**
   - Variáveis de ambiente necessárias
   - Como configurar cron job
   - Como mapear vendedores

3. **Fluxo de Sincronização**
   - Como funciona o cron job
   - Como determinar a loja
   - Como processar pedidos

4. **Como Mapear Vendedores**
   - Passo a passo
   - Exemplos

5. **Como Processar Pedidos**
   - Quando processar
   - Como processar
   - O que acontece com o estoque

6. **Troubleshooting**
   - Problemas comuns
   - Soluções
   - Logs importantes

7. **API Endpoints**
   - Documentação dos endpoints
   - Exemplos de uso

**Checklist:**
- [ ] Documentação criada
- [ ] Exemplos incluídos
- [ ] Troubleshooting documentado
- [ ] Imagens/diagramas (se necessário)

**Tempo estimado:** 30 minutos

---

## 📊 Ordem de Execução Recomendada

```
┌─────────────────────────────────────────────────────────┐
│ Fase 1: Banco de Dados (30 min)                        │
│ └─> Migração e geração do cliente                       │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│ Fase 2: Utilitários (30 min)                            │
│ └─> Funções auxiliares                                  │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│ Fase 3: API (1h)                                        │
│ └─> Endpoints principais                                │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│ Fase 4: Configuração (15 min)                           │
│ └─> Vercel e variáveis                                  │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│ Fase 5: Interface (1h)                                  │
│ └─> Telas e atualizações                                │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│ Fase 6: Scripts (15 min)                                 │
│ └─> Scripts auxiliares                                  │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│ Fase 7: Testes (30 min)                                  │
│ └─> Validação completa                                  │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│ Fase 8: Documentação (15 min)                             │
│ └─> Finalização                                         │
└─────────────────────────────────────────────────────────┘
```

**Tempo Total Estimado:** 3h 15min

---

## ✅ Checklist Final

### Banco de Dados
- [ ] Schema atualizado com todos os campos necessários
- [ ] Migração criada e aplicada com sucesso
- [ ] Cliente Prisma regenerado
- [ ] Relações entre tabelas funcionando
- [ ] Índices criados corretamente

### Backend
- [ ] Função determinarLoja criada e testada
- [ ] Função buscarItens criada e testada
- [ ] Função xmlToJson criada e testada
- [ ] Endpoint sync criado e funcionando
- [ ] Endpoint processar criado e funcionando
- [ ] Endpoint listar criado e funcionando
- [ ] Tratamento de erros robusto
- [ ] Logs implementados

### Configuração
- [ ] vercel.json criado e configurado
- [ ] Variáveis de ambiente configuradas localmente
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Cron job configurado e agendado
- [ ] CRON_SECRET gerado de forma segura

### Frontend
- [ ] Campo id_vendedor_tiny adicionado em usuários
- [ ] Data access de usuários atualizado
- [ ] Tela de pedidos criada
- [ ] Data access de pedidos criado
- [ ] Interface responsiva e funcional
- [ ] Feedback visual implementado

### Testes
- [ ] Testes locais passando
- [ ] Deploy realizado na Vercel
- [ ] Cron job executando corretamente
- [ ] Dados sendo sincronizados
- [ ] Processamento de pedidos funcionando
- [ ] Baixa de estoque funcionando

### Documentação
- [ ] Documentação da integração criada
- [ ] Instruções de uso documentadas
- [ ] Troubleshooting documentado
- [ ] Exemplos incluídos

---

## 🚀 Próximos Passos Após Implementação

1. **Mapear vendedores existentes**
   - Executar script de mapeamento
   - Verificar mapeamentos

2. **Configurar loja padrão**
   - Definir qual loja usar como fallback
   - Configurar variável de ambiente

3. **Executar primeira sincronização manual**
   - Testar endpoint manualmente
   - Verificar dados sincronizados

4. **Monitorar logs**
   - Acompanhar primeiras execuções do cron
   - Verificar se há erros

5. **Processar pedidos pendentes**
   - Revisar pedidos sincronizados
   - Processar pedidos válidos

6. **Validar baixa de estoque**
   - Verificar se estoque está sendo descontado corretamente
   - Validar cálculos

---

## 🔧 Troubleshooting Comum

### Problema: Pedidos não estão sendo sincronizados

**Possíveis causas:**
- Token da API Tiny inválido ou expirado
- Endpoint não está acessível
- Erro na requisição à API

**Soluções:**
1. Verificar token no .env e na Vercel
2. Testar endpoint manualmente
3. Verificar logs da Vercel
4. Verificar se API Tiny está funcionando

---

### Problema: Loja não está sendo determinada

**Possíveis causas:**
- Vendedor não tem `id_vendedor_tiny` cadastrado
- Vendedor não tem loja associada
- Loja padrão não configurada

**Soluções:**
1. Verificar se vendedor tem `id_vendedor_tiny` no banco
2. Verificar se vendedor tem `loja` associada
3. Configurar `LOJA_PADRAO_PEDIDOS`
4. Executar script de mapeamento

---

### Problema: Erro ao processar XML

**Possíveis causas:**
- Biblioteca xml2js não instalada
- Formato da resposta mudou
- XML malformado

**Soluções:**
1. Verificar se xml2js está instalado
2. Verificar formato da resposta da API
3. Adicionar tratamento de erro mais robusto
4. Verificar logs para ver XML recebido

---

### Problema: Estoque não está sendo descontado

**Possíveis causas:**
- Pedido não tem `loja_id` definido
- Produtos não estão mapeados
- Estoque insuficiente
- Erro na transação

**Soluções:**
1. Verificar se pedido tem `loja_id`
2. Verificar mapeamento de produtos
3. Verificar estoque disponível
4. Verificar logs de erro
5. Verificar se transação está sendo executada

---

### Problema: Cron job não está executando

**Possíveis causas:**
- vercel.json não está na raiz
- Schedule incorreto
- Endpoint retornando erro
- Variáveis de ambiente não configuradas

**Soluções:**
1. Verificar se vercel.json está na raiz do projeto
2. Verificar sintaxe do schedule
3. Verificar logs da Vercel
4. Testar endpoint manualmente
5. Verificar variáveis de ambiente

---

## 📝 Notas Importantes

1. **Segurança:**
   - Nunca commitar token da API no código
   - Sempre usar variáveis de ambiente
   - Proteger endpoint de cron com CRON_SECRET

2. **Performance:**
   - Processar pedidos em lote pode ser necessário
   - Considerar paginação na API Tiny
   - Monitorar tempo de execução do cron

3. **Idempotência:**
   - Garantir que pedidos não sejam duplicados
   - Usar `codigo_tiny` como chave única
   - Verificar antes de criar

4. **Monitoramento:**
   - Configurar alertas para erros
   - Monitorar logs regularmente
   - Acompanhar sincronizações

5. **Manutenção:**
   - Revisar mapeamentos periodicamente
   - Atualizar vendedores quando necessário
   - Manter documentação atualizada

---

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Consultar documentação
2. Verificar logs
3. Revisar este plano de execução
4. Consultar documentação da API Tiny

---

**Documento criado em:** 2024  
**Última atualização:** 2024  
**Versão:** 1.0

