# Documentação Técnica - Tela de Dashboard

## Visão Geral

A tela de Dashboard atualmente funciona como um redirecionador automático para a página de Estoque. A implementação original de dashboard com estatísticas e gráficos está comentada no código, mas foi desabilitada em favor de um redirecionamento direto.

**Arquivo:** `src/app/dashboard/page.tsx`

---

## Funcionalidades Atuais

### 1. Redirecionamento Automático
- Redireciona automaticamente para `/dashboard/estoque`
- Exibe mensagem de "Redirecionando..." durante o processo
- Implementado via `useEffect` e `useRouter`

### 2. Dashboard Original (Comentado)
A implementação original incluía:
- Cards de estatísticas (valor do estoque, itens, mostruário, alertas)
- Gráficos de distribuição de estoque (placeholder)
- Tabela de últimas movimentações
- Lista de produtos com estoque baixo
- Filtro por loja

**Status:** Código comentado, não está em uso ativo

---

## Tecnologias e Bibliotecas Utilizadas

### Core Framework
- **Next.js 15.5.2** - Framework React com App Router
  - `useRouter` - Navegação programática
  - `'use client'` - Componente cliente-side

### Hooks React
- **React 19.1.0**
  - `useEffect` - Efeito para redirecionamento
  - `useRouter` - Hook do Next.js para navegação

### Estilização
- **Tailwind CSS** - Framework CSS utility-first
  - Classes utilitárias para layout e espaçamento

---

## Fluxo Completo do Código

### 1. Componente Principal

```typescript
export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a página de estoque
    router.push('/dashboard/estoque');
  }, [router]);
```

**O que acontece:**
1. Componente funcional React
2. `useRouter` obtém instância do roteador
3. `useEffect` executa após montagem do componente
4. Chama `router.push('/dashboard/estoque')` para redirecionar
5. Array de dependências `[router]` garante execução única

### 2. Renderização Durante Redirecionamento

```typescript
return (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Redirecionando...</h1>
        <p className="text-muted-foreground">
          Você será redirecionado para a página de estoque em instantes.
        </p>
      </div>
    </div>
  </div>
);
```

**O que acontece:**
- Exibe mensagem amigável durante redirecionamento
- Layout centralizado com altura mínima
- Usa classes Tailwind para estilização
- Texto informativo para o usuário

---

## Dashboard Original (Código Comentado)

### Estrutura Planejada

O código comentado mostra uma implementação completa de dashboard com:

#### 1. Cards de Estatísticas

```typescript
const stats = {
  totalValue: 125000,
  totalItems: 1234,
  displayItems: 45,
  lowStockAlerts: 8
};
```

**Componentes:**
- `StatCard` - Componente reutilizável para exibir métricas
- Ícones do Lucide React (DollarSign, Package, Eye, AlertTriangle)
- Indicadores de tendência (up/down/neutral)

#### 2. Filtro por Loja

```typescript
const [selectedStore, setSelectedStore] = useState('all');
```

- Select dropdown para escolher loja específica
- Opção "Todas as Lojas" para visão geral
- Filtra dados baseado na seleção

#### 3. Gráficos (Placeholder)

```typescript
<div className="h-64 flex items-center justify-center text-muted-foreground">
  <div className="text-center">
    <Package className="w-12 h-12 mx-auto mb-2" />
    <p>Gráfico de distribuição</p>
    <p className="text-sm">Instale recharts para visualizar</p>
  </div>
</div>
```

**Observação:** Gráficos não implementados, apenas placeholders com mensagem sugerindo instalação do `recharts`

#### 4. Tabela de Últimas Movimentações

```typescript
const recentMovements = [
  {
    id: '1',
    type: 'sale',
    item: { product: { name: 'Produto X' } },
    fromStore: { name: 'Loja Centro' },
    date: new Date().toISOString()
  },
  // ...
];
```

**Funcionalidades:**
- Lista movimentações recentes
- Ícones diferentes por tipo (venda, transferência, entrada)
- Formatação de data em português
- Hover effects para melhor UX

#### 5. Produtos com Estoque Baixo

```typescript
const lowStockProducts = [
  { id: '1', name: 'Produto A', sku: 'SKU001', available: 3, minStock: 10, needed: 7 },
  // ...
];
```

**Funcionalidades:**
- Lista produtos abaixo do estoque mínimo
- Exibe quantidade disponível vs. mínima
- Botão "Repor" para cada item
- Mensagem quando todos os produtos estão OK

---

## Bibliotecas do Dashboard Original (Comentado)

### Componentes UI
- **@/components/StatCard** - Card de estatísticas
- **@/components/StatusBadge** - Badge de status
- **@/components/ui/select** - Select dropdown
- **@/components/ui/button** - Botões

### Ícones
- **lucide-react**
  - `DollarSign` - Valor monetário
  - `Package` - Produtos
  - `Eye` - Mostruário
  - `AlertTriangle` - Alertas
  - `ArrowUpRight` - Vendas
  - `ArrowDownRight` - Transferências
  - `TrendingUp` - Tendências

### Dados Mockados
- Estatísticas hardcoded
- Movimentações mockadas
- Produtos com estoque baixo mockados

**Observação:** Todos os dados são estáticos, não há integração com API

---

## Fluxograma de Funcionamento

```
[Usuário acessa /dashboard]
    ↓
[Componente Dashboard monta]
    ↓
[useEffect executa]
    ↓
[router.push('/dashboard/estoque')]
    ↓
[Next.js redireciona navegação]
    ↓
[Usuário vê página de Estoque]
```

---

## Decisão de Design

### Por que Redirecionar?

A decisão de redirecionar em vez de mostrar o dashboard completo pode ter sido tomada por:

1. **Foco na Funcionalidade Principal:** Estoque é a funcionalidade mais usada
2. **Simplificação:** Reduz complexidade da interface
3. **Performance:** Evita carregar dados desnecessários
4. **Desenvolvimento Futuro:** Dashboard pode ser reativado quando necessário

### Código Preservado

O código original está comentado, permitindo:
- Referência futura para implementação
- Manutenção fácil se necessário reativar
- Documentação do que foi planejado

---

## Estrutura de Dados Planejada

### Stats Object
```typescript
{
  totalValue: number,      // Valor total do estoque em R$
  totalItems: number,      // Total de itens em estoque
  displayItems: number,     // Itens no mostruário
  lowStockAlerts: number   // Alertas de estoque baixo
}
```

### Movement Object
```typescript
{
  id: string,
  type: 'sale' | 'transfer' | 'entry',
  item: { product: { name: string } },
  fromStore: { name: string },
  toStore?: { name: string },
  date: string (ISO)
}
```

### Low Stock Product
```typescript
{
  id: string,
  name: string,
  sku: string,
  available: number,
  minStock: number,
  needed: number
}
```

---

## Integração com API (Não Implementada)

O dashboard original não fazia chamadas à API. Para implementação futura, seria necessário:

1. **Endpoint de Estatísticas:**
   - `/api/dashboard/stats` - Retornar métricas agregadas

2. **Endpoint de Movimentações:**
   - `/api/movimentacoes/recentes` - Últimas movimentações

3. **Endpoint de Alertas:**
   - `/api/produtos/estoque-baixo` - Produtos abaixo do mínimo

4. **WebSockets ou Polling:**
   - Atualização em tempo real das estatísticas

---

## Melhorias Sugeridas

### Para Reativação do Dashboard

1. **Integração com API Real:**
   - Substituir dados mockados por chamadas à API
   - Implementar loading states
   - Tratamento de erros

2. **Gráficos:**
   - Instalar `recharts` ou `chart.js`
   - Implementar gráficos de distribuição
   - Gráficos de tendência temporal

3. **Filtros Avançados:**
   - Filtro por período (últimos 7 dias, 30 dias, etc.)
   - Filtro por tipo de movimentação
   - Exportação de relatórios

4. **Atualização em Tempo Real:**
   - WebSockets para atualizações live
   - Polling periódico
   - Notificações push

5. **Performance:**
   - Lazy loading de componentes pesados
   - Memoização de cálculos
   - Paginação de movimentações

---

## Código de Exemplo para Reativação

Se desejar reativar o dashboard, seria necessário:

```typescript
// 1. Descomentar código
// 2. Criar hooks para buscar dados
const { data: stats, isLoading } = useDashboardStats();
const { data: movements } = useRecentMovements();
const { data: lowStock } = useLowStockProducts();

// 3. Implementar componentes de gráfico
import { LineChart, BarChart } from 'recharts';

// 4. Adicionar tratamento de loading
if (isLoading) return <LoadingSpinner />;
```

---

## Conclusão

A tela de Dashboard atualmente serve como um ponto de redirecionamento simples, direcionando usuários diretamente para a funcionalidade principal de Estoque. O código original de dashboard completo está preservado em comentários, permitindo fácil reativação no futuro quando necessário. A implementação atual é eficiente e focada, priorizando a experiência do usuário com acesso rápido à funcionalidade mais utilizada.

