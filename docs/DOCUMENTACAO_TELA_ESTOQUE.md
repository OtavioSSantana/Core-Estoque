# Documentação Técnica - Tela de Gestão de Estoque

## Visão Geral

A tela de Gestão de Estoque é a funcionalidade principal do sistema CORE Estoque, permitindo visualizar, filtrar e gerenciar todos os itens de estoque do sistema. Esta tela oferece funcionalidades completas de movimentação de estoque, incluindo entradas, saídas, transferências entre lojas, movimentações para/do mostruário e ajustes.

**Arquivo:** `src/app/dashboard/estoque/page.tsx`

---

## Funcionalidades Principais

### 1. Visualização de Estoque
- Tabela completa com todos os itens de estoque
- Informações detalhadas: produto, ID, local, preço, quantidades
- Suporte a paginação
- Filtros por loja, status e busca textual

### 2. Seleção Múltipla de Itens
- Checkboxes para seleção individual
- Seleção em massa (selecionar todos)
- Contador de itens selecionados
- Ações em lote sobre itens selecionados

### 3. Movimentações de Estoque
- **Entrada de Estoque:** Registrar entrada de produtos
- **Saída de Estoque:** Registrar saída de produtos
- **Outros Movimentos:** Transferências, ajustes, movimentações de mostruário

### 4. Filtros e Busca
- Filtro por loja (todos ou específica)
- Busca por ID, SKU, código ou nome do produto
- Filtro por status (comentado, não ativo)

### 5. Paginação
- Navegação entre páginas
- Controle de tamanho de página
- Informações de total de itens

---

## Tecnologias e Bibliotecas Utilizadas

### Core Framework
- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0** - Biblioteca UI
  - `useState` - Gerenciamento de estado
  - `useEffect` - Efeitos colaterais
  - `useCallback` - Memoização de funções

### UI Components (shadcn/ui)
- **@/components/ui/button** - Botões estilizados
- **@/components/ui/input** - Campos de entrada
- **@/components/ui/label** - Rótulos
- **@/components/ui/select** - Dropdowns
- **@/components/ui/checkbox** - Checkboxes
- **@/components/ui/dialog** - Modais
- **@/components/ui/table** - Tabelas

### Ícones
- **lucide-react 0.542.0**
  - `Search` - Busca
  - `Package` - Pacote/produto
  - `Plus` - Adicionar/entrada
  - `Minus` - Remover/saída

### Hooks Customizados
- **@/hooks/use-toast** - Sistema de notificações toast

### Data Access Layer
- **@/app/dashboard/estoque/_data_access/get-estoque** - Buscar estoque
- **@/app/dashboard/estoque/_data_access/saida-estoque** - Registrar saídas
- **@/app/dashboard/estoque/_data_access/update-estoque** - Atualizar estoque

---

## Estrutura de Dados

### Interface EstoqueItem

```typescript
interface EstoqueItem {
  id: number;
  codigo: string;
  descricao: string;
  fornecedor: string;
  quantidade_estoque: number;
  quantidade_mostruario: number;
  quantidade_disponivel: number;
  preco_venda: string | number;
  total_valor_estoque: number;
  status_estoque: 'baixo' | 'normal' | 'alto' | 'disponível' | 'mostruário' | 'em_trânsito' | 'vendido' | 'reservado';
  loja_id: number | string | null;
  data_entrada: Date | string;
  barcode?: string;
  notas?: string;
  produto_id?: string | number;
  produto?: {
    nome: string;
    sku: string;
  };
  loja?: {
    id: number | string;
    nome: string;
  };
}
```

---

## Fluxo Completo do Código

### 1. Inicialização do Componente

```typescript
export default function Estoque() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  // Estados principais
  const [stockItems, setStockItems] = useState<EstoqueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [stores, setStores] = useState<{id: string; nome: string}[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
```

**O que acontece:**
- Componente funcional com múltiplos estados
- Hook de autenticação para verificar permissões
- Hook de toast para notificações
- Estados para dados, filtros, paginação e seleção

### 2. Busca de Dados do Estoque

```typescript
const fetchStockData = useCallback(async () => {
  try {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('paginated', 'true');
    params.set('page', String(pageNumber));
    params.set('pageSize', String(pageSize));
    if (searchTerm) params.set('search', searchTerm);
    if (selectedStatus !== 'all') params.set('status', selectedStatus);
    if (selectedStore !== 'all') params.set('lojaId', selectedStore);
    
    const response = await fetch(`/api/estoque?${params.toString()}`);
    
    if (!response.ok) {
      // Tratamento de erros
      throw new Error(errorData.message || `Erro ao carregar estoque`);
    }
    
    const data = await response.json();
    if (Array.isArray(data)) {
      setStockItems(data);
      setTotalPages(1);
    } else {
      setStockItems(data.items || []);
      setTotalPages(data.meta?.totalPages || 1);
    }
  } catch (error) {
    // Tratamento de erro com toast
    toast({
      title: 'Erro',
      description: 'Não foi possível carregar os itens do estoque',
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
}, [pageNumber, pageSize, selectedStatus, selectedStore, searchTerm, toast]);
```

**Fluxo detalhado:**
1. Cria `URLSearchParams` com parâmetros de paginação e filtros
2. Faz requisição GET para `/api/estoque` com query params
3. Trata resposta paginada ou array simples
4. Atualiza estados `stockItems` e `totalPages`
5. Trata erros com toast notifications
6. Desativa loading no `finally`

**Memoização:** `useCallback` evita recriação desnecessária da função

### 3. Carregamento Inicial de Dados

```typescript
useEffect(() => {
  fetchStockData();
}, [isAdmin, pageNumber, pageSize, selectedStatus, selectedStore, fetchStockData]);

useEffect(() => {
  // Carrega lojas da API dedicada
  (async () => {
    try {
      const resp = await fetch('/api/lojas');
      if (resp.ok) {
        const lojas = await resp.json();
        setStores(lojas.map((l: { id: number; nome: string | null }) => 
          ({ id: String(l.id), nome: l.nome || `Loja ${l.id}` })
        ));
      }
    } catch {
      // fallback silencioso
    }
  })();
  
  // Carrega tipos de movimento
  (async () => {
    try {
      const resp = await fetch('/api/estoque/tipos-movimento');
      if (resp.ok) {
        const tipos = await resp.json();
        setTiposMovimento(Array.isArray(tipos) ? tipos : []);
      }
    } catch {
      // silencioso
    }
  })();
}, []);
```

**O que acontece:**
- Primeiro `useEffect`: Recarrega estoque quando filtros/paginação mudam
- Segundo `useEffect`: Carrega lojas e tipos de movimento uma vez na montagem
- Tratamento silencioso de erros para dados auxiliares

### 4. Filtragem de Itens

```typescript
const filteredItems = stockItems.filter(item => {
  // Filtro de permissão
  if (!isAdmin && user?.storeId && String(item.loja_id ?? '') !== user.storeId) {
    return false;
  }

  // Filtro de loja
  if (selectedStore !== 'all' && String(item.loja_id ?? '') !== selectedStore) {
    return false;
  }

  // Filtro de status
  if (selectedStatus !== 'all' && item.status_estoque !== selectedStatus) {
    return false;
  }

  // Filtro de busca
  if (searchTerm) {
    const search = searchTerm.toLowerCase();
    return (
      (item.barcode?.toLowerCase() || '').includes(search) ||
      (item.produto?.nome?.toLowerCase() || '').includes(search) ||
      (item.produto?.sku?.toLowerCase() || '').includes(search) ||
      item.codigo.toLowerCase().includes(search) ||
      item.descricao.toLowerCase().includes(search)
    );
  }

  return true;
});
```

**Lógica de filtragem:**
1. **Permissões:** Usuários não-admin só veem itens da sua loja
2. **Loja:** Filtra por loja selecionada
3. **Status:** Filtra por status (se não for 'all')
4. **Busca:** Busca em múltiplos campos (barcode, nome, SKU, código, descrição)
5. **Case-insensitive:** Busca ignora maiúsculas/minúsculas

### 5. Seleção de Itens

```typescript
const handleSelectAll = (checked: boolean) => {
  if (checked) {
    setSelectedItems(filteredItems.map(item => 
      `${item.id}-${item.loja_id ?? 'global'}`
    ));
  } else {
    setSelectedItems([]);
  }
};

const handleSelectItem = (itemKey: string, checked: boolean) => {
  if (checked) {
    setSelectedItems([...selectedItems, itemKey]);
  } else {
    setSelectedItems(selectedItems.filter(key => key !== itemKey));
  }
};
```

**Chave única:** Usa `${id}-${loja_id}` para identificar itens únicos (mesmo produto em lojas diferentes)

### 6. Dialog de Entrada de Estoque

```typescript
const handleOpenEntradaDialog = () => {
  if (selectedItems.length === 0) {
    toast({ 
      title: 'Atenção', 
      description: 'Selecione pelo menos um produto na tabela', 
      variant: 'destructive' 
    });
    return;
  }

  const item = stockItems.find(i => 
    `${i.id}-${i.loja_id ?? 'global'}` === selectedItems[0]
  );
  
  if (item) {
    setEntradaProdutoId(item.id);
    if (item.loja_id) {
      setEntradaLojaId(String(item.loja_id));
    }
    
    if (selectedItems.length > 1) {
      toast({ 
        title: 'Atenção', 
        description: `Múltiplos itens selecionados. Processando apenas: ${item.descricao || item.codigo}`, 
      });
    }
  }
  setIsEntradaDialogOpen(true);
};
```

**Fluxo:**
1. Valida se há itens selecionados
2. Pega primeiro item selecionado
3. Preenche campos do formulário
4. Avisa se múltiplos itens foram selecionados
5. Abre dialog

### 7. Submissão de Entrada

```typescript
const handleSubmitEntrada = async () => {
  if (!entradaProdutoId || !entradaLojaId || !entradaQuantidade) {
    toast({ title: 'Erro', description: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
    return;
  }

  const qtd = parseInt(entradaQuantidade);
  if (!qtd || qtd <= 0) {
    toast({ title: 'Erro', description: 'Quantidade deve ser maior que zero', variant: 'destructive' });
    return;
  }

  setIsSubmitting(true);
  try {
    const response = await fetch('/api/estoque/movimentacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produto_id: entradaProdutoId,
        quantidade: qtd,
        loja_id: parseInt(entradaLojaId),
        tipo_movimento: parseInt(entradaTipoMovimento),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Falha ao registrar entrada');
    }

    await fetchStockData(); // Recarrega dados
    setIsEntradaDialogOpen(false);
    // Limpa estados
    toast({ title: 'Sucesso', description: 'Entrada de estoque registrada com sucesso!' });
  } catch (error) {
    // Tratamento de erro
  } finally {
    setIsSubmitting(false);
  }
};
```

**Validações:**
- Campos obrigatórios preenchidos
- Quantidade válida (> 0)
- Requisição POST para API
- Recarrega dados após sucesso
- Feedback visual com toast

### 8. Dialog de Outros Movimentos

```typescript
const handleConfirmMovement = async () => {
  try {
    if (itemsToMove.length === 0) return;
    const qtd = parseInt(quantity || '0');
    if (!qtd || qtd <= 0) {
      toast({ title: 'Erro', description: 'Quantidade inválida', variant: 'destructive' });
      return;
    }

    // Transferência entre lojas
    if (selectedTipoMovimento === 'transfer_between_stores') {
      if (!moveSelectedStore) {
        toast({ title: 'Erro', description: 'Selecione a loja de destino', variant: 'destructive' });
        return;
      }
      const lojaDestino = parseInt(moveSelectedStore);
      
      // Valida origem != destino
      const invalidSameStore = itemsToMove.filter(item => {
        const origem = item.loja_id || 1;
        return Number(origem) === lojaDestino;
      });
      if (invalidSameStore.length > 0) {
        toast({ title: 'Erro', description: 'Origem e destino não podem ser a mesma loja.', variant: 'destructive' });
        return;
      }
      
      // Valida saldo suficiente
      const insuficientes = itemsToMove.filter(item => 
        (item.quantidade_estoque ?? 0) < qtd
      );
      if (insuficientes.length > 0) {
        toast({ title: 'Erro', description: 'Quantidade solicitada excede o disponível/estoque na origem.', variant: 'destructive' });
        return;
      }
      
      await Promise.all(
        itemsToMove.map(item => updateEstoque({
          produto_id: item.id,
          tipo_movimentacao: 'transfer_between_stores',
          quantidade: qtd,
          loja_origem: Number(item.loja_id) || 1,
          loja_destino: lojaDestino,
        }))
      );
    } else {
      // Outros tipos de movimento
      const tipoChave = parseInt(selectedTipoMovimento || '0');
      // ... lógica para cada tipo
    }

    await fetchStockData();
    setIsMoveDialogOpen(false);
    // Limpa estados
    toast({ title: 'Sucesso', description: 'Operação realizada com sucesso!' });
  } catch (error) {
    // Tratamento de erro
  }
};
```

**Tipos de Movimento Suportados:**

1. **Transferência entre Lojas** (`transfer_between_stores`)
   - Valida origem ≠ destino
   - Valida saldo suficiente na origem
   - Usa `updateEstoque` com tipo específico

2. **Entradas** (Tipo 1, 5, 7 positivo)
   - POST `/api/estoque/movimentacoes`
   - Tipos: Entrada, Devolução de Cliente, Ajuste Positivo

3. **Saídas** (Tipo 2, 6, 8, 7 negativo)
   - POST `/api/estoque/saidas`
   - Tipos: Saída, Devolução ao Fornecedor, Perda/Avaria, Ajuste Negativo

4. **Enviar para Mostruário** (Tipo 3)
   - `transferirEstoque` com `tipo_transferencia: 'estoque_para_mostruario'`

5. **Retornar do Mostruário** (Tipo 4)
   - `transferirEstoque` com `tipo_transferencia: 'mostruario_para_estoque'`

---

## Tipos de Movimentação

### Constantes de Tipo de Movimento

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
```

**Mapeamento:**
- **1 - Entrada:** Entrada normal de produtos
- **2 - Saída:** Saída normal de produtos
- **3 - Enviar para Mostruário:** Move de estoque para mostruário
- **4 - Retornar do Mostruário:** Move de mostruário para estoque
- **5 - Devolução de Cliente:** Entrada por devolução
- **6 - Devolução ao Fornecedor:** Saída por devolução
- **7 - Ajuste:** Ajuste positivo ou negativo (requer direção)
- **8 - Perda/Avaria:** Saída por perda ou avaria
- **transfer_between_stores:** Transferência entre lojas (especial)

---

## Estrutura da Tabela

### Colunas da Tabela

1. **Checkbox:** Seleção de itens
2. **Produto:** Nome e SKU/código
3. **ID do Item:** Barcode ou código
4. **Local:** Nome da loja
5. **Preço de Venda:** Formatado em R$
6. **Qtd. Estoque:** Quantidade em estoque
7. **Qtd. Mostruário:** Quantidade no mostruário
8. **Qtd. Disponível:** Soma de estoque + mostruário

### Renderização de Linhas

```typescript
{filteredItems.map((item) => (
  <TableRow key={`${item.id}-${item.loja_id ?? 'global'}`}>
    <TableCell>
      <Checkbox
        checked={selectedItems.includes(`${item.id}-${item.loja_id ?? 'global'}`)}
        onCheckedChange={(checked) => handleSelectItem(`${item.id}-${item.loja_id ?? 'global'}`, checked as boolean)}
      />
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-3">
        <div>
          <p className="font-medium text-sm">{item.produto?.nome || item.descricao}</p>
          <p className="text-xs text-muted-foreground">
            {item.produto?.sku ? `SKU: ${item.produto.sku}` : `Código: ${item.codigo}`}
          </p>
        </div>
      </div>
    </TableCell>
    {/* ... outras colunas */}
  </TableRow>
))}
```

---

## Dialogs e Modais

### 1. Dialog de Entrada
- Campos: Produto (readonly), Loja, Tipo de Movimento, Quantidade
- Validação: Todos os campos obrigatórios
- Submit: POST `/api/estoque/movimentacoes`

### 2. Dialog de Saída
- Campos: Produto (readonly), Loja, Tipo de Movimento, Quantidade
- Validação: Todos os campos obrigatórios
- Submit: POST `/api/estoque/saidas`

### 3. Dialog de Outros Movimentos
- Campo: Tipo de Movimentação (select)
- Condicional: Campos mudam baseado no tipo selecionado
  - Transferência entre lojas: Loja destino, Quantidade
  - Outros: Loja, Quantidade, Direção (se ajuste)
- Validação: Dinâmica baseada no tipo

---

## Integração com API

### Endpoints Utilizados

1. **GET /api/estoque**
   - Query params: `paginated`, `page`, `pageSize`, `search`, `status`, `lojaId`
   - Retorna: Array de `EstoqueItem` ou objeto paginado

2. **POST /api/estoque/movimentacoes**
   - Body: `{ produto_id, quantidade, loja_id, tipo_movimento }`
   - Para: Entradas (tipo 1, 5)

3. **POST /api/estoque/saidas**
   - Body: `{ produto_id, quantidade, loja_id, tipo_movimento }`
   - Para: Saídas (tipo 2, 6, 8)

4. **POST /api/estoque/transferencias**
   - Body: `{ produto_id, quantidade, loja_origem, loja_destino }`
   - Para: Transferências entre lojas

5. **GET /api/lojas**
   - Retorna: Lista de lojas para filtros e selects

6. **GET /api/estoque/tipos-movimento**
   - Retorna: Lista de tipos de movimento disponíveis

---

## Tratamento de Erros

### Tipos de Erro Tratados

1. **Erro de Conexão com Banco:**
   ```typescript
   if (response.status === 503 || errorData.message?.includes('banco de dados')) {
     throw new Error('Erro de conexão com o banco de dados. Verifique sua conexão.');
   }
   ```

2. **Erro de Validação:**
   - Campos obrigatórios não preenchidos
   - Quantidade inválida (≤ 0)
   - Origem = destino em transferências
   - Saldo insuficiente

3. **Erro de API:**
   - Resposta não OK
   - Erro ao processar requisição
   - Timeout ou erro de rede

### Feedback ao Usuário

- **Toast de Sucesso:** Verde, confirmação de operação
- **Toast de Erro:** Vermelho, descrição do erro
- **Toast de Atenção:** Amarelo, avisos e informações

---

## Permissões e Segurança

### Controle de Acesso

```typescript
const availableStores = isAdmin 
  ? stores 
  : stores.filter(store => store.id === user?.storeId);
```

**Lógica:**
- **Admin:** Vê todas as lojas e todos os itens
- **Usuário comum:** Vê apenas sua loja e itens da sua loja

### Filtro por Permissão

```typescript
if (!isAdmin && user?.storeId && String(item.loja_id ?? '') !== user.storeId) {
  return false; // Item não aparece para usuário não-admin
}
```

---

## Performance e Otimizações

### Memoização
- `useCallback` em `fetchStockData` evita recriação desnecessária
- Dependências corretas nos `useEffect`

### Paginação
- Carrega apenas 10 itens por página (configurável)
- Reduz carga inicial e melhora performance

### Filtragem Client-Side
- Filtros aplicados após carregamento
- Busca case-insensitive eficiente

---

## Fluxograma de Movimentação

```
[Usuário seleciona itens]
    ↓
[Usuário clica em ação (Entrada/Saída/Outros)]
    ↓
[Dialog abre com formulário]
    ↓
[Usuário preenche campos]
    ↓
[Validação de campos]
    ├─ Inválido → [Toast de erro] → [Usuário corrige]
    └─ Válido → [Submit]
                  ↓
            [Requisição à API]
                  ↓
        [API processa movimentação]
                  ↓
        [Sucesso?]
        ├─ SIM → [Atualiza banco] → [Recarrega estoque] → [Toast de sucesso] → [Fecha dialog]
        └─ NÃO → [Toast de erro] → [Dialog permanece aberto]
```

---

## Melhorias Sugeridas

1. **Validação Avançada:**
   - Validação de saldo antes de abrir dialog
   - Prevenção de estoque negativo

2. **Feedback Visual:**
   - Loading states nos botões
   - Skeleton loaders na tabela
   - Animações de transição

3. **Funcionalidades:**
   - Exportação para Excel/CSV
   - Histórico de movimentações
   - Gráficos de tendência
   - Alertas de estoque baixo

4. **Performance:**
   - Virtualização de tabela para muitos itens
   - Debounce na busca
   - Cache de dados

5. **UX:**
   - Atalhos de teclado
   - Confirmação para ações destrutivas
   - Undo/Redo de movimentações

---

## Conclusão

A tela de Gestão de Estoque é uma implementação completa e robusta, oferecendo todas as funcionalidades necessárias para gerenciar estoque de forma eficiente. O código está bem estruturado, com separação clara de responsabilidades, tratamento adequado de erros e boa experiência do usuário. A arquitetura permite fácil extensão e manutenção futura.

