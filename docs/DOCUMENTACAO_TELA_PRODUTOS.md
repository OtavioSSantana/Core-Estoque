# Documentação Técnica - Tela de Gestão de Produtos

## Visão Geral

A tela de Gestão de Produtos permite gerenciar o catálogo completo de produtos do sistema. Esta tela oferece funcionalidades de CRUD (Create, Read, Update, Delete) para produtos, incluindo busca, criação, edição e exclusão de produtos.

**Arquivo:** `src/app/dashboard/produtos/page.tsx`

---

## Funcionalidades Principais

### 1. Visualização de Produtos
- Tabela completa com todos os produtos cadastrados
- Informações: código, descrição, fornecedor, estoque, mostruário, disponível, preço
- Indicadores visuais de estoque (cores diferentes para estoque zero)

### 2. Busca de Produtos
- Busca por descrição, código ou fornecedor
- Busca case-insensitive
- Filtragem em tempo real

### 3. Criação de Produtos
- Modal de criação com formulário completo
- Campos: código, descrição, fornecedor, preço de venda
- Validação de campos obrigatórios

### 4. Edição de Produtos
- Modal de edição pré-preenchido
- Atualização de todos os campos
- Validação antes de salvar

### 5. Exclusão de Produtos
- Modal de confirmação antes de excluir
- Exibição de informações do produto a ser excluído
- Feedback visual de confirmação

---

## Tecnologias e Bibliotecas Utilizadas

### Core Framework
- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0**
  - `useState` - Gerenciamento de estado
  - `useEffect` - Efeitos colaterais

### UI Components (shadcn/ui)
- **@/components/ui/button** - Botões estilizados
- **@/components/ui/input** - Campos de entrada
- **@/components/ui/label** - Rótulos
- **@/components/ui/textarea** - Área de texto
- **@/components/ui/dialog** - Modais
- **@/components/ui/table** - Tabelas

### Ícones
- **lucide-react 0.542.0**
  - `Search` - Busca
  - `Plus` - Adicionar
  - `Edit` - Editar
  - `Trash2` - Excluir

---

## Estrutura de Dados

### Interface Produto

```typescript
type Produto = {
  id: number;
  codigo: string;
  descricao: string;
  fornecedor: string;
  preco_venda: string; // API retorna como string
  quantidade_mostruario: number;
  quantidade_estoque: number;
  quantidade_disponivel: number;
};
```

---

## Fluxo Completo do Código

### 1. Inicialização do Componente

```typescript
export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Produto | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    fornecedor: '',
    preco_venda: ''
  });
```

**Estados gerenciados:**
- `produtos`: Lista de produtos
- `loading`: Estado de carregamento
- `erro`: Mensagens de erro
- `searchTerm`: Termo de busca
- `isDialogOpen`: Controle de modal de criação/edição
- `editingProduct`: Produto sendo editado (null = criação)
- `deletingProduct`: Produto a ser excluído
- `formData`: Dados do formulário

### 2. Carregamento de Produtos

```typescript
useEffect(() => {
  async function fetchProdutos() {
    setLoading(true);
    setErro(null);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await res.json();
      setProdutos(data);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }
  fetchProdutos();
}, []);
```

**Fluxo:**
1. Executa na montagem do componente
2. Ativa loading
3. Limpa erros anteriores
4. Faz GET para `/api/products`
5. Atualiza estado `produtos`
6. Trata erros
7. Desativa loading

### 3. Criação de Produto

```typescript
const handleAddProduct = async () => {
  setIsSubmitting(true);
  setErro(null);

  try {
    // Validação básica
    if (!formData.codigo || !formData.descricao || !formData.fornecedor || !formData.preco_venda) {
      throw new Error('Preencha todos os campos obrigatórios');
    }

    // Faz a requisição POST para a API
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao criar produto');
    }

    // Adiciona o novo produto à lista local
    setProdutos(prev => [...prev, data]);
    
    // Limpa o formulário e fecha o modal
    resetForm();
    setIsDialogOpen(false);
    
    // Mostra mensagem de sucesso
    alert('Produto adicionado com sucesso!');

  } catch (error: unknown) {
    setErro(error instanceof Error ? error.message : 'Erro ao adicionar produto');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Validações:**
- Todos os campos obrigatórios preenchidos
- Requisição POST para `/api/products`
- Atualização otimista da lista local
- Feedback com `alert` (poderia usar toast)

### 4. Edição de Produto

```typescript
const handleEditProduct = (produto: Produto) => {
  setEditingProduct(produto);
  setFormData({
    codigo: produto.codigo,
    descricao: produto.descricao,
    fornecedor: produto.fornecedor,
    preco_venda: produto.preco_venda
  });
  setIsDialogOpen(true);
};

const handleUpdateProduct = async () => {
  if (!editingProduct) return;

  setIsSubmitting(true);
  setErro(null);

  try {
    // Validação básica
    if (!formData.codigo || !formData.descricao || !formData.fornecedor || !formData.preco_venda) {
      throw new Error('Preencha todos os campos obrigatórios');
    }

    // Faz a requisição PUT para a API
    const response = await fetch('/api/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editingProduct.id,
        ...formData
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao atualizar produto');
    }

    // Atualiza o produto na lista local
    setProdutos(prev => prev.map(p => p.id === editingProduct.id ? data : p));
    
    // Limpa o formulário e fecha o modal
    resetForm();
    setEditingProduct(null);
    setIsDialogOpen(false);
    
    // Mostra mensagem de sucesso
    alert('Produto atualizado com sucesso!');

  } catch (error: unknown) {
    setErro(error instanceof Error ? error.message : 'Erro ao atualizar produto');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Fluxo de edição:**
1. `handleEditProduct`: Preenche formulário com dados do produto
2. `handleUpdateProduct`: Valida e envia PUT para API
3. Atualiza lista local com produto editado
4. Limpa estados e fecha modal

### 5. Exclusão de Produto

```typescript
const handleDeleteProduct = (produto: Produto) => {
  setDeletingProduct(produto);
  setShowDeleteDialog(true);
};

const handleConfirmDelete = async () => {
  if (!deletingProduct) return;

  setIsSubmitting(true);
  setErro(null);

  try {
    // Faz a requisição DELETE para a API
    const response = await fetch(`/api/products?id=${deletingProduct.id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao deletar produto');
    }

    // Remove o produto da lista local
    setProdutos(prev => prev.filter(p => p.id !== deletingProduct.id));
    
    // Fecha o modal de confirmação
    setShowDeleteDialog(false);
    setDeletingProduct(null);
    
    // Mostra mensagem de sucesso
    alert('Produto deletado com sucesso!');

  } catch (error: unknown) {
    setErro(error instanceof Error ? error.message : 'Erro ao deletar produto');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Fluxo de exclusão:**
1. `handleDeleteProduct`: Abre modal de confirmação
2. Modal exibe informações do produto
3. `handleConfirmDelete`: Envia DELETE para API
4. Remove produto da lista local
5. Fecha modal e limpa estados

### 6. Filtragem de Produtos

```typescript
const filteredProducts = produtos.filter(produto => {
  if (!searchTerm) return true;
  const search = searchTerm.toLowerCase();
  return (
    produto.descricao.toLowerCase().includes(search) ||
    produto.codigo.toLowerCase().includes(search) ||
    produto.fornecedor.toLowerCase().includes(search)
  );
});
```

**Busca:**
- Case-insensitive
- Busca em descrição, código e fornecedor
- Filtragem em tempo real conforme digitação

---

## Estrutura da Tabela

### Colunas

1. **Código:** Código do produto (formatado como código)
2. **Descrição:** Nome/descrição do produto
3. **Fornecedor:** Nome do fornecedor
4. **Estoque Total:** Quantidade em estoque (vermelho se zero)
5. **Mostruário:** Quantidade no mostruário
6. **Disponível:** Quantidade total disponível (verde/amarelo)
7. **Preço de Venda:** Formatado em R$ com 2 decimais
8. **Ações:** Botões de editar e excluir

### Renderização de Linhas

```typescript
{filteredProducts.map((produto) => (
  <TableRow key={produto.id} className="hover:bg-muted/50">
    <TableCell>
      <code className="text-xs bg-muted px-2 py-1 rounded">
        {produto.codigo}
      </code>
    </TableCell>
    <TableCell>
      <div>
        <p className="font-medium">{produto.descricao}</p>
      </div>
    </TableCell>
    <TableCell>{produto.fornecedor}</TableCell>
    <TableCell className="text-center">
      <span className={produto.quantidade_estoque === 0 ? 'text-destructive font-medium' : ''}>
        {produto.quantidade_estoque}
      </span>
    </TableCell>
    <TableCell className="text-center">{produto.quantidade_mostruario}</TableCell>
    <TableCell className="text-center">
      <span className={produto.quantidade_disponivel === 0 ? 'text-warning font-medium' : 'text-success'}>
        {produto.quantidade_disponivel}
      </span>
    </TableCell>
    <TableCell>
      <p className="font-medium">R$ {parseFloat(produto.preco_venda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
    </TableCell>
    <TableCell>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => handleEditProduct(produto)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(produto)}>
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
))}
```

**Indicadores visuais:**
- Estoque zero: Texto vermelho (`text-destructive`)
- Disponível zero: Texto amarelo (`text-warning`)
- Disponível > 0: Texto verde (`text-success`)

---

## Modais e Dialogs

### 1. Dialog de Criação/Edição

**Campos do formulário:**
- **Código do Produto:** Input texto, obrigatório
- **Fornecedor:** Input texto, obrigatório
- **Descrição:** Textarea, obrigatório
- **Preço de Venda:** Input número com step 0.01, obrigatório

**Validação:**
- HTML5 `required` nos campos
- Validação JavaScript antes de submit
- Mensagem de erro se campos vazios

**Botões:**
- Cancelar: Fecha modal e limpa formulário
- Adicionar/Atualizar: Submete formulário

### 2. Dialog de Confirmação de Exclusão

**Conteúdo:**
- Título: "Confirmar Exclusão"
- Descrição: Aviso de ação irreversível
- Card vermelho com informações do produto:
  - Ícone de lixeira
  - Nome do produto
  - Código do produto

**Botões:**
- Cancelar: Fecha modal
- Excluir Produto: Confirma exclusão (variante destructive)

---

## Integração com API

### Endpoints Utilizados

1. **GET /api/products**
   - Retorna: Array de produtos
   - Usado: Carregamento inicial

2. **POST /api/products**
   - Body: `{ codigo, descricao, fornecedor, preco_venda }`
   - Retorna: Produto criado
   - Usado: Criação de produto

3. **PUT /api/products**
   - Body: `{ id, codigo, descricao, fornecedor, preco_venda }`
   - Retorna: Produto atualizado
   - Usado: Edição de produto

4. **DELETE /api/products?id={id}**
   - Query param: `id` do produto
   - Retorna: Confirmação
   - Usado: Exclusão de produto

---

## Tratamento de Erros

### Tipos de Erro

1. **Erro de Rede:**
   - Falha na requisição
   - Timeout
   - Servidor indisponível

2. **Erro de Validação:**
   - Campos obrigatórios vazios
   - Formato inválido

3. **Erro de API:**
   - Resposta não OK
   - Mensagem de erro do servidor

### Exibição de Erros

```typescript
{erro && (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
    {erro}
  </div>
)}
```

- Card vermelho com borda
- Mensagem de erro clara
- Visível em todos os modais

---

## Estados de Loading

### Loading Inicial

```typescript
{loading && (
  <div className="text-center py-8">
    <p className="text-muted-foreground">Carregando produtos...</p>
  </div>
)}
```

### Loading de Submit

```typescript
<Button 
  disabled={isSubmitting}
>
  {isSubmitting 
    ? (editingProduct ? 'Atualizando...' : 'Adicionando...') 
    : (editingProduct ? 'Atualizar Produto' : 'Adicionar Produto')
  }
</Button>
```

- Botão desabilitado durante submit
- Texto muda para indicar ação em progresso

---

## Funções Auxiliares

### Reset de Formulário

```typescript
const resetForm = () => {
  setFormData({
    codigo: '',
    descricao: '',
    fornecedor: '',
    preco_venda: ''
  });
};
```

### Atualização de Campos

```typescript
const handleInputChange = (field: string, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

---

## Fluxograma de Operações

### Criação de Produto

```
[Usuário clica "Adicionar Produto"]
    ↓
[Modal abre com formulário vazio]
    ↓
[Usuário preenche campos]
    ↓
[Usuário clica "Adicionar Produto"]
    ↓
[Validação de campos]
    ├─ Inválido → [Exibe erro] → [Usuário corrige]
    └─ Válido → [POST /api/products]
                  ↓
            [API cria produto]
                  ↓
        [Sucesso?]
        ├─ SIM → [Adiciona à lista] → [Fecha modal] → [Alert de sucesso]
        └─ NÃO → [Exibe erro] → [Modal permanece aberto]
```

### Edição de Produto

```
[Usuário clica ícone de editar]
    ↓
[Modal abre com formulário preenchido]
    ↓
[Usuário edita campos]
    ↓
[Usuário clica "Atualizar Produto"]
    ↓
[Validação de campos]
    ├─ Inválido → [Exibe erro]
    └─ Válido → [PUT /api/products]
                  ↓
            [API atualiza produto]
                  ↓
        [Sucesso?]
        ├─ SIM → [Atualiza na lista] → [Fecha modal] → [Alert de sucesso]
        └─ NÃO → [Exibe erro]
```

### Exclusão de Produto

```
[Usuário clica ícone de excluir]
    ↓
[Modal de confirmação abre]
    ↓
[Exibe informações do produto]
    ↓
[Usuário confirma exclusão]
    ↓
[DELETE /api/products?id={id}]
    ↓
[API exclui produto]
    ↓
[Sucesso?]
├─ SIM → [Remove da lista] → [Fecha modal] → [Alert de sucesso]
└─ NÃO → [Exibe erro]
```

---

## Melhorias Sugeridas

1. **Sistema de Notificações:**
   - Substituir `alert` por toast notifications
   - Feedback mais elegante e não bloqueante

2. **Validação Avançada:**
   - Validação de código único
   - Validação de formato de preço
   - Validação de caracteres especiais

3. **Funcionalidades:**
   - Upload de imagem do produto
   - Categorias de produtos
   - Histórico de alterações
   - Exportação para Excel/CSV

4. **Performance:**
   - Debounce na busca
   - Paginação de produtos
   - Lazy loading de imagens

5. **UX:**
   - Confirmação antes de fechar modal com dados não salvos
   - Atalhos de teclado
   - Autocomplete de fornecedores

---

## Conclusão

A tela de Gestão de Produtos oferece funcionalidades completas de CRUD para produtos, com interface intuitiva e tratamento adequado de erros. O código está bem estruturado e fácil de manter, com separação clara entre lógica de negócio e apresentação. A implementação atual é funcional e eficiente, com espaço para melhorias futuras em UX e funcionalidades avançadas.

