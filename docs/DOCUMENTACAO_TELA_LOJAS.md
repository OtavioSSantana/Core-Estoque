# Documentação Técnica - Tela de Gestão de Lojas

## Visão Geral

A tela de Gestão de Lojas permite gerenciar todas as lojas e depósitos do sistema. Esta tela oferece funcionalidades de CRUD (Create, Read, Update, Delete) para lojas, exibindo informações detalhadas de cada loja em formato de cards visuais.

**Arquivo:** `src/app/dashboard/lojas/page.tsx`

---

## Funcionalidades Principais

### 1. Visualização de Lojas
- Grid de cards com todas as lojas
- Informações: nome, ID, endereço, gerente, total de produtos
- Indicadores visuais de status (ponto verde)
- Layout responsivo (1-3 colunas conforme tamanho da tela)

### 2. Criação de Lojas
- Modal de criação com formulário
- Campos: nome (obrigatório), endereço (opcional), ID do gerente (opcional)
- Validação de campos obrigatórios

### 3. Edição de Lojas
- Modal de edição pré-preenchido
- Atualização de todos os campos
- Validação antes de salvar

### 4. Exclusão de Lojas
- Confirmação via `confirm()` antes de excluir
- Feedback visual com toast notifications

### 5. Resumo Geral
- Card com estatísticas agregadas
- Total de lojas
- Lojas com endereço cadastrado
- Total de produtos na rede

---

## Tecnologias e Bibliotecas Utilizadas

### Core Framework
- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0**
  - `useState` - Gerenciamento de estado
  - `useEffect` - Efeitos colaterais
  - `useCallback` - Memoização de funções

### UI Components (shadcn/ui)
- **@/components/ui/button** - Botões estilizados
- **@/components/ui/input** - Campos de entrada
- **@/components/ui/label** - Rótulos
- **@/components/ui/dialog** - Modais
- **@/components/ui/card** - Cards

### Ícones
- **lucide-react 0.542.0**
  - `Store` - Ícone de loja
  - `MapPin` - Ícone de localização
  - `User` - Ícone de usuário
  - `Package` - Ícone de pacote/produtos
  - `Edit` - Editar
  - `Trash2` - Excluir
  - `Plus` - Adicionar
  - `Loader2` - Loading spinner

### Hooks Customizados
- **@/hooks/use-toast** - Sistema de notificações toast

---

## Estrutura de Dados

### Interface Loja

```typescript
interface Loja {
  id: number;
  nome: string | null;
  endereco: string | null;
  gerente: number | null;
  qtd_total_prod: number | null;
}
```

---

## Fluxo Completo do Código

### 1. Inicialização do Componente

```typescript
export default function Lojas() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLoja, setEditingLoja] = useState<Loja | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    gerente: ''
  });
  const { toast } = useToast();
```

**Estados gerenciados:**
- `lojas`: Lista de lojas
- `loading`: Estado de carregamento
- `isCreateDialogOpen`: Controle de modal de criação
- `isEditDialogOpen`: Controle de modal de edição
- `editingLoja`: Loja sendo editada
- `formData`: Dados do formulário

### 2. Carregamento de Lojas

```typescript
const fetchLojas = useCallback(async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/lojas');
    if (response.ok) {
      const data = await response.json();
      setLojas(data);
    } else {
      toast({
        title: "Erro",
        description: "Erro ao carregar lojas",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao carregar lojas:', error);
    toast({
      title: "Erro",
      description: "Erro ao carregar lojas",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
}, [toast]);

useEffect(() => {
  fetchLojas();
}, [fetchLojas]);
```

**Fluxo:**
1. `useCallback` memoiza função de busca
2. Ativa loading
3. Faz GET para `/api/lojas`
4. Atualiza estado `lojas`
5. Trata erros com toast
6. Desativa loading
7. `useEffect` executa na montagem

### 3. Criação de Loja

```typescript
const handleCreateLoja = async () => {
  try {
    const response = await fetch('/api/lojas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: formData.nome,
        endereco: formData.endereco || null,
        gerente: formData.gerente ? parseInt(formData.gerente) : null,
      }),
    });

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: "Loja criada com sucesso!",
      });
      setIsCreateDialogOpen(false);
      setFormData({ nome: '', endereco: '', gerente: '' });
      fetchLojas();
    } else {
      const error = await response.json();
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar loja",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao criar loja:', error);
    toast({
      title: "Erro",
      description: "Erro ao criar loja",
      variant: "destructive",
    });
  }
};
```

**Validações:**
- Nome obrigatório (validação no botão: `disabled={!formData.nome.trim()}`)
- Endereço e gerente opcionais
- Conversão de gerente para número se preenchido
- Recarrega lista após criação

### 4. Edição de Loja

```typescript
const openEditDialog = (loja: Loja) => {
  setEditingLoja(loja);
  setFormData({
    nome: loja.nome || '',
    endereco: loja.endereco || '',
    gerente: loja.gerente?.toString() || '',
  });
  setIsEditDialogOpen(true);
};

const handleEditLoja = async () => {
  if (!editingLoja) return;

  try {
    const response = await fetch(`/api/lojas/${editingLoja.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: formData.nome,
        endereco: formData.endereco || null,
        gerente: formData.gerente ? parseInt(formData.gerente) : null,
      }),
    });

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: "Loja atualizada com sucesso!",
      });
      setIsEditDialogOpen(false);
      setEditingLoja(null);
      setFormData({ nome: '', endereco: '', gerente: '' });
      fetchLojas();
    } else {
      const error = await response.json();
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar loja",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar loja:', error);
    toast({
      title: "Erro",
      description: "Erro ao atualizar loja",
      variant: "destructive",
    });
  }
};
```

**Fluxo:**
1. `openEditDialog`: Preenche formulário com dados da loja
2. `handleEditLoja`: Valida e envia PUT para API
3. Atualiza lista após sucesso
4. Limpa estados e fecha modal

### 5. Exclusão de Loja

```typescript
const handleDeleteLoja = async (id: number) => {
  if (!confirm('Tem certeza que deseja deletar esta loja?')) return;

  try {
    const response = await fetch(`/api/lojas/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: "Loja deletada com sucesso!",
      });
      fetchLojas();
    } else {
      const error = await response.json();
      toast({
        title: "Erro",
        description: error.message || "Erro ao deletar loja",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao deletar loja:', error);
    toast({
      title: "Erro",
      description: "Erro ao deletar loja",
      variant: "destructive",
    });
  }
};
```

**Confirmação:**
- Usa `confirm()` nativo do browser
- Apenas prossegue se usuário confirmar
- Feedback com toast notifications

---

## Estrutura Visual dos Cards

### Card de Loja

```typescript
<Card className="p-6 hover:shadow-lg transition-all hover:border-primary/50">
  {/* Store Header */}
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary-light rounded-lg">
        <Store className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{loja.nome}</h3>
        <span className="text-xs text-muted-foreground">
          ID: {loja.id}
        </span>
      </div>
    </div>
    <div className="w-2 h-2 rounded-full bg-success" />
  </div>

  {/* Store Info */}
  <div className="space-y-3 text-sm">
    {loja.endereco && (
      <div className="flex items-start gap-2">
        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
        <span className="text-muted-foreground flex-1">{loja.endereco}</span>
      </div>
    )}
    {loja.gerente && (
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">
          Gerente ID: <strong className="text-foreground">{loja.gerente}</strong>
        </span>
      </div>
    )}
  </div>

  {/* Store Stats */}
  <div className="pt-4 border-t border-border">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Total de Produtos</span>
      </div>
      <span className="text-2xl font-bold text-primary">{loja.qtd_total_prod || 0}</span>
    </div>
  </div>

  {/* Actions */}
  <div className="flex gap-2 pt-4">
    <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(loja)}>
      <Edit className="w-4 h-4 mr-2" />
      Editar
    </Button>
    <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive" onClick={() => handleDeleteLoja(loja.id)}>
      <Trash2 className="w-4 h-4 mr-2" />
      Deletar
    </Button>
  </div>
</Card>
```

**Componentes do card:**
1. **Header:** Ícone, nome, ID, indicador de status
2. **Info:** Endereço (se houver), Gerente (se houver)
3. **Stats:** Total de produtos com ícone
4. **Actions:** Botões de editar e deletar

### Grid Responsivo

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {lojas.map((loja) => (
    <Card>...</Card>
  ))}
</div>
```

**Breakpoints:**
- Mobile: 1 coluna
- Tablet (md): 2 colunas
- Desktop (lg): 3 colunas

---

## Card de Resumo Geral

```typescript
<div className="bg-card rounded-lg border border-border p-6">
  <h3 className="text-lg font-semibold mb-4">Resumo Geral</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <p className="text-sm text-muted-foreground">Total de Lojas</p>
      <p className="text-2xl font-bold">{lojas.length}</p>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Lojas com Endereço</p>
      <p className="text-2xl font-bold text-success">
        {lojas.filter(l => l.endereco).length}
      </p>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Total de Produtos (Rede)</p>
      <p className="text-2xl font-bold text-primary">
        {lojas.reduce((acc, loja) => acc + (loja.qtd_total_prod || 0), 0)}
      </p>
    </div>
  </div>
</div>
```

**Estatísticas calculadas:**
- Total de lojas: `lojas.length`
- Lojas com endereço: Filtro de lojas com `endereco` não nulo
- Total de produtos: Soma de `qtd_total_prod` de todas as lojas

---

## Modais e Dialogs

### 1. Dialog de Criação

**Campos:**
- **Nome da Loja:** Input texto, obrigatório
- **Endereço:** Input texto, opcional
- **ID do Gerente:** Input número, opcional

**Validação:**
- Nome obrigatório (validação no botão)
- Botão desabilitado se nome vazio

**Botões:**
- Cancelar: Fecha modal e limpa formulário
- Adicionar Loja: Submete formulário

### 2. Dialog de Edição

**Campos:**
- Mesmos campos do dialog de criação
- Pré-preenchidos com dados da loja

**Botões:**
- Cancelar: Fecha modal e limpa formulário
- Salvar Alterações: Submete atualização

---

## Integração com API

### Endpoints Utilizados

1. **GET /api/lojas**
   - Retorna: Array de lojas
   - Usado: Carregamento inicial

2. **POST /api/lojas**
   - Body: `{ nome, endereco?, gerente? }`
   - Retorna: Loja criada
   - Usado: Criação de loja

3. **PUT /api/lojas/{id}**
   - Body: `{ nome, endereco?, gerente? }`
   - Retorna: Loja atualizada
   - Usado: Edição de loja

4. **DELETE /api/lojas/{id}**
   - Retorna: Confirmação
   - Usado: Exclusão de loja

---

## Tratamento de Erros

### Tipos de Erro

1. **Erro de Rede:**
   - Falha na requisição
   - Servidor indisponível

2. **Erro de API:**
   - Resposta não OK
   - Mensagem de erro do servidor

### Exibição de Erros

```typescript
toast({
  title: "Erro",
  description: error.message || "Erro ao [operacao]",
  variant: "destructive",
});
```

- Toast vermelho (destructive)
- Mensagem clara e específica
- Não bloqueia interface

---

## Estados de Loading

### Loading Inicial

```typescript
if (loading) {
  return (
    <div className="p-6 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
}
```

- Spinner centralizado
- Tela inteira bloqueada durante loading
- Ícone animado do Lucide React

---

## Funções Auxiliares

### Fechar Dialogs

```typescript
const closeDialogs = () => {
  setIsCreateDialogOpen(false);
  setIsEditDialogOpen(false);
  setEditingLoja(null);
  setFormData({ nome: '', endereco: '', gerente: '' });
};
```

- Fecha todos os modais
- Limpa estados
- Reseta formulário

---

## Fluxograma de Operações

### Criação de Loja

```
[Usuário clica "Adicionar Nova Loja"]
    ↓
[Modal de criação abre]
    ↓
[Usuário preenche nome (obrigatório)]
    ↓
[Usuário preenche endereço e gerente (opcionais)]
    ↓
[Usuário clica "Adicionar Loja"]
    ↓
[Validação: nome preenchido?]
    ├─ NÃO → [Botão desabilitado]
    └─ SIM → [POST /api/lojas]
              ↓
        [API cria loja]
              ↓
      [Sucesso?]
      ├─ SIM → [Toast de sucesso] → [Recarrega lista] → [Fecha modal]
      └─ NÃO → [Toast de erro]
```

### Edição de Loja

```
[Usuário clica "Editar" no card]
    ↓
[Modal de edição abre com dados preenchidos]
    ↓
[Usuário edita campos]
    ↓
[Usuário clica "Salvar Alterações"]
    ↓
[PUT /api/lojas/{id}]
    ↓
[API atualiza loja]
    ↓
[Sucesso?]
├─ SIM → [Toast de sucesso] → [Recarrega lista] → [Fecha modal]
└─ NÃO → [Toast de erro]
```

### Exclusão de Loja

```
[Usuário clica "Deletar" no card]
    ↓
[confirm() pergunta confirmação]
    ↓
[Usuário confirma?]
    ├─ NÃO → [Operação cancelada]
    └─ SIM → [DELETE /api/lojas/{id}]
              ↓
        [API exclui loja]
              ↓
      [Sucesso?]
      ├─ SIM → [Toast de sucesso] → [Recarrega lista]
      └─ NÃO → [Toast de erro]
```

---

## Melhorias Sugeridas

1. **Validação Avançada:**
   - Validação de ID de gerente (verificar se existe)
   - Validação de formato de endereço
   - Prevenção de nomes duplicados

2. **Funcionalidades:**
   - Busca de lojas
   - Filtro por gerente
   - Ordenação (nome, ID, produtos)
   - Histórico de alterações

3. **Visual:**
   - Mapa com localização das lojas
   - Gráficos de distribuição de produtos
   - Indicadores de performance por loja

4. **UX:**
   - Confirmação mais elegante que `confirm()`
   - Modal de confirmação customizado
   - Atalhos de teclado

5. **Performance:**
   - Lazy loading de cards
   - Virtualização para muitas lojas
   - Cache de dados

---

## Conclusão

A tela de Gestão de Lojas oferece uma interface visual e intuitiva para gerenciar lojas e depósitos. O uso de cards torna a visualização mais amigável, e as funcionalidades de CRUD estão completas e funcionais. O código está bem estruturado, com tratamento adequado de erros e feedback visual através de toast notifications. A implementação atual é eficiente e fácil de manter.

