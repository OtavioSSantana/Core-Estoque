# Documentação Técnica - Tela de Gestão de Usuários

## Visão Geral

A tela de Gestão de Usuários permite gerenciar todos os usuários do sistema, incluindo criação, edição, exclusão e ativação/desativação de contas. Esta tela oferece controle completo sobre permissões e acesso ao sistema.

**Arquivo:** `src/app/dashboard/usuarios/page.tsx`

---

## Funcionalidades Principais

### 1. Visualização de Usuários
- Tabela completa com todos os usuários
- Informações: nome, login, email, função, setor, loja, status
- Badges visuais para função e status
- Avatar com iniciais do nome

### 2. Criação de Usuários
- Modal de criação com formulário completo
- Campos: nome, login, senha (número), email, setor, loja
- Validação de campos

### 3. Edição de Usuários
- Modal de edição pré-preenchido
- Atualização de todos os campos
- Senha opcional (mantém atual se vazio)

### 4. Exclusão de Usuários
- Confirmação via `confirm()` antes de excluir
- Feedback visual com toast notifications

### 5. Ativação/Desativação
- Toggle de status (ativo/inativo)
- Endpoint dedicado para ativar/desativar
- Feedback visual imediato

### 6. Resumo de Usuários
- Card com estatísticas agregadas
- Total de usuários
- Total de administradores
- Usuários ativos vs. inativos

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
- **@/components/ui/select** - Dropdowns
- **@/components/ui/dialog** - Modais
- **@/components/ui/table** - Tabelas
- **@/components/ui/badge** - Badges de status

### Ícones
- **lucide-react 0.542.0**
  - `UserPlus` - Adicionar usuário
  - `Edit` - Editar
  - `Power` - Ativar/Desativar
  - `Trash2` - Excluir
  - `RefreshCw` - Atualizar

### Hooks Customizados
- **@/hooks/use-toast** - Sistema de notificações toast

---

## Estrutura de Dados

### Interface Usuario

```typescript
interface Usuario {
  id: number;
  nome: string;
  login: string;
  email?: string;
  setor?: number;
  setor_descricao?: string;
  loja?: number;
  loja_nome?: string;
  inativo: boolean;
}
```

### Interface Loja

```typescript
interface Loja {
  id: number;
  nome: string;
}
```

### Interface Setor

```typescript
interface Setor {
  id: number;
  descricao: string;
}
```

---

## Fluxo Completo do Código

### 1. Inicialização do Componente

```typescript
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    login: '',
    senha: '',
    email: '',
    setor: '',
    loja: '',
  });
  const { toast } = useToast();
```

**Estados gerenciados:**
- `usuarios`: Lista de usuários
- `lojas`: Lista de lojas (para select)
- `setores`: Lista de setores (para select)
- `loading`: Estado de carregamento
- `formData`: Dados do formulário

### 2. Carregamento de Dados

```typescript
const loadUsuarios = useCallback(async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/usuarios');
    if (response.ok) {
      const data = await response.json();
      setUsuarios(data);
    } else {
      toast({
        title: "Erro",
        description: "Erro ao carregar usuários",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    toast({
      title: "Erro",
      description: "Erro ao carregar usuários",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
}, [toast]);

useEffect(() => {
  loadUsuarios();
  loadLojas();
  loadSetores();
}, [loadUsuarios]);
```

**Carregamento paralelo:**
- Usuários: GET `/api/usuarios`
- Lojas: GET `/api/lojas`
- Setores: Mockado (hardcoded)

### 3. Criação de Usuário

```typescript
const handleCreateUsuario = async () => {
  try {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: formData.nome,
        login: formData.login,
        senha: parseInt(formData.senha),
        email: formData.email || null,
        setor: formData.setor ? parseInt(formData.setor) : null,
        loja: formData.loja ? parseInt(formData.loja) : null,
      }),
    });

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso!",
      });
      setIsDialogOpen(false);
      resetForm();
      loadUsuarios();
    } else {
      const error = await response.json();
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar usuário",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    toast({
      title: "Erro",
      description: "Erro ao criar usuário",
      variant: "destructive",
    });
  }
};
```

**Observações:**
- Senha convertida para número (`parseInt`)
- Email, setor e loja podem ser null
- Recarrega lista após criação

### 4. Edição de Usuário

```typescript
const openEditDialog = (usuario: Usuario) => {
  setSelectedUsuario(usuario);
  setFormData({
    nome: usuario.nome || '',
    login: usuario.login || '',
    senha: '', // Não preenche senha por segurança
    email: usuario.email || '',
    setor: usuario.setor?.toString() || '',
    loja: usuario.loja?.toString() || '',
  });
  setIsEditDialogOpen(true);
};

const handleUpdateUsuario = async () => {
  if (!selectedUsuario) return;

  try {
    const response = await fetch(`/api/usuarios/${selectedUsuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: formData.nome,
        login: formData.login,
        senha: formData.senha ? parseInt(formData.senha) : undefined,
        email: formData.email || null,
        setor: formData.setor ? parseInt(formData.setor) : null,
        loja: formData.loja ? parseInt(formData.loja) : null,
      }),
    });

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso!",
      });
      setIsEditDialogOpen(false);
      setSelectedUsuario(null);
      resetForm();
      loadUsuarios();
    } else {
      const error = await response.json();
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar usuário",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    toast({
      title: "Erro",
      description: "Erro ao atualizar usuário",
      variant: "destructive",
    });
  }
};
```

**Segurança:**
- Senha não é pré-preenchida no formulário
- Senha só é enviada se preenchida (`undefined` se vazio)
- Mantém senha atual se campo vazio

### 5. Exclusão de Usuário

```typescript
const handleDeleteUsuario = async (id: number) => {
  if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

  try {
    const response = await fetch(`/api/usuarios/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: "Usuário deletado com sucesso!",
      });
      loadUsuarios();
    } else {
      const error = await response.json();
      toast({
        title: "Erro",
        description: error.message || "Erro ao deletar usuário",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    toast({
      title: "Erro",
      description: "Erro ao deletar usuário",
      variant: "destructive",
    });
  }
};
```

### 6. Ativação/Desativação

```typescript
const handleToggleStatus = async (usuario: Usuario) => {
  try {
    const endpoint = usuario.inativo ? 'activate' : 'deactivate';
    const response = await fetch(`/api/usuarios/${usuario.id}/${endpoint}`, {
      method: 'PUT',
    });

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: `Usuário ${usuario.inativo ? 'ativado' : 'desativado'} com sucesso!`,
      });
      loadUsuarios();
    } else {
      const error = await response.json();
      toast({
        title: "Erro",
        description: error.message || "Erro ao alterar status do usuário",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error('Erro ao alterar status do usuário:', error);
    toast({
      title: "Erro",
      description: "Erro ao alterar status do usuário",
      variant: "destructive",
    });
  }
};
```

**Lógica:**
- Endpoint dinâmico baseado no status atual
- `activate` se inativo, `deactivate` se ativo
- Feedback contextual na mensagem

---

## Estrutura da Tabela

### Colunas

1. **Usuário:** Avatar com iniciais + nome
2. **Login:** Login do usuário (fonte monoespaçada)
3. **Email:** Email ou "-" se não houver
4. **Função:** Badge (Administrador ou Usuário)
5. **Setor:** Descrição do setor ou "-"
6. **Loja:** Nome da loja ou "-"
7. **Status:** Badge (Ativo/Inativo) com cores
8. **Ações:** Botões de editar, ativar/desativar, excluir

### Renderização de Linhas

```typescript
{usuarios.map((usuario) => (
  <TableRow key={usuario.id} className="hover:bg-muted/50">
    <TableCell>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold">
            {usuario.nome?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <p className="font-medium">{usuario.nome}</p>
        </div>
      </div>
    </TableCell>
    <TableCell className="font-mono text-sm">
      {usuario.login}
    </TableCell>
    <TableCell className="text-muted-foreground">
      {usuario.email || '-'}
    </TableCell>
    <TableCell>
      {getRoleBadge(usuario)}
    </TableCell>
    {/* ... outras colunas */}
    <TableCell>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => openEditDialog(usuario)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(usuario)}>
          <Power className={`w-4 h-4 ${usuario.inativo ? 'text-green-600' : 'text-red-600'}`} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleDeleteUsuario(usuario.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
))}
```

**Avatar:**
- Círculo com fundo colorido
- Inicial do nome em maiúscula
- Fallback "U" se nome não disponível

**Badge de Função:**
```typescript
const getRoleBadge = (usuario: Usuario) => {
  if (usuario.login === 'ADMIN') {
    return <Badge className="bg-primary text-primary-foreground">Administrador</Badge>;
  }
  return <Badge variant="secondary">Usuário</Badge>;
};
```

**Badge de Status:**
```typescript
<Badge 
  variant={usuario.inativo ? 'secondary' : 'default'}
  className={usuario.inativo 
    ? 'bg-muted text-muted-foreground' 
    : 'bg-green-100 text-green-800 border-green-200'
  }
>
  {usuario.inativo ? 'Inativo' : 'Ativo'}
</Badge>
```

---

## Modais e Dialogs

### 1. Dialog de Criação

**Campos:**
- **Nome Completo:** Input texto
- **Login:** Input texto
- **Senha (Número):** Input número
- **Email:** Input email
- **Setor:** Select com setores
- **Loja:** Select com lojas

**Validação:**
- Campos básicos (sem validação avançada)
- Senha como número

### 2. Dialog de Edição

**Campos:**
- Mesmos campos do dialog de criação
- **Nova Senha:** Opcional (deixe vazio para manter)

**Observação:**
- Senha não pré-preenchida por segurança
- Mensagem clara sobre manter senha atual

---

## Integração com API

### Endpoints Utilizados

1. **GET /api/usuarios**
   - Retorna: Array de usuários
   - Usado: Carregamento inicial

2. **POST /api/usuarios**
   - Body: `{ nome, login, senha, email?, setor?, loja? }`
   - Retorna: Usuário criado
   - Usado: Criação de usuário

3. **PUT /api/usuarios/{id}**
   - Body: `{ nome, login, senha?, email?, setor?, loja? }`
   - Retorna: Usuário atualizado
   - Usado: Edição de usuário

4. **DELETE /api/usuarios/{id}**
   - Retorna: Confirmação
   - Usado: Exclusão de usuário

5. **PUT /api/usuarios/{id}/activate**
   - Retorna: Confirmação
   - Usado: Ativar usuário

6. **PUT /api/usuarios/{id}/deactivate**
   - Retorna: Confirmação
   - Usado: Desativar usuário

7. **GET /api/lojas**
   - Retorna: Array de lojas
   - Usado: Preencher select de lojas

---

## Setores Mockados

```typescript
const loadSetores = async () => {
  try {
    setSetores([
      { id: 1, descricao: 'Administração' },
      { id: 2, descricao: 'Vendas' },
      { id: 3, descricao: 'Estoque' },
      { id: 4, descricao: 'Financeiro' },
    ]);
  } catch (error) {
    console.error('Erro ao carregar setores:', error);
  }
};
```

**Observação:** Setores estão hardcoded. Para produção, criar API de setores.

---

## Card de Resumo

```typescript
<div className="bg-card rounded-lg border border-border p-6">
  <h3 className="text-lg font-semibold mb-4">Resumo de Usuários</h3>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div>
      <p className="text-sm text-muted-foreground">Total de Usuários</p>
      <p className="text-2xl font-bold">{usuarios.length}</p>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Administradores</p>
      <p className="text-2xl font-bold text-primary">
        {usuarios.filter(u => u.login === 'ADMIN').length}
      </p>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Usuários Ativos</p>
      <p className="text-2xl font-bold text-green-600">
        {usuarios.filter(u => !u.inativo).length}
      </p>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Usuários Inativos</p>
      <p className="text-2xl font-bold text-red-600">
        {usuarios.filter(u => u.inativo).length}
      </p>
    </div>
  </div>
</div>
```

**Estatísticas:**
- Total: Contagem simples
- Administradores: Filtro por `login === 'ADMIN'`
- Ativos: Filtro por `!inativo`
- Inativos: Filtro por `inativo`

---

## Tratamento de Erros

### Estados de Loading

```typescript
{loading ? (
  <TableRow>
    <TableCell colSpan={8} className="text-center py-8">
      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
      Carregando usuários...
    </TableCell>
  </TableRow>
) : usuarios.length === 0 ? (
  <TableRow>
    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
      Nenhum usuário encontrado
    </TableCell>
  </TableRow>
) : (
  // Renderiza usuários
)}
```

**Estados:**
- Loading: Spinner animado
- Vazio: Mensagem informativa
- Dados: Tabela completa

---

## Fluxograma de Operações

### Criação de Usuário

```
[Usuário clica "Novo Usuário"]
    ↓
[Modal de criação abre]
    ↓
[Usuário preenche campos]
    ↓
[Usuário clica "Criar Usuário"]
    ↓
[POST /api/usuarios]
    ↓
[API cria usuário]
    ↓
[Sucesso?]
├─ SIM → [Toast de sucesso] → [Recarrega lista] → [Fecha modal]
└─ NÃO → [Toast de erro]
```

### Ativação/Desativação

```
[Usuário clica ícone Power]
    ↓
[Determina endpoint: activate ou deactivate]
    ↓
[PUT /api/usuarios/{id}/{endpoint}]
    ↓
[API altera status]
    ↓
[Sucesso?]
├─ SIM → [Toast contextual] → [Recarrega lista]
└─ NÃO → [Toast de erro]
```

---

## Melhorias Sugeridas

1. **Segurança:**
   - Hash de senha no frontend antes de enviar
   - Validação de força de senha
   - Confirmação de senha no formulário

2. **Validação:**
   - Validação de email válido
   - Validação de login único
   - Validação de formato de senha

3. **Funcionalidades:**
   - Busca de usuários
   - Filtro por setor/loja/status
   - Exportação de lista
   - Histórico de alterações

4. **UX:**
   - Confirmação customizada para exclusão
   - Modal de confirmação para desativação
   - Atalhos de teclado

5. **API de Setores:**
   - Criar endpoint `/api/setores`
   - Substituir dados mockados
   - Permitir CRUD de setores

---

## Conclusão

A tela de Gestão de Usuários oferece funcionalidades completas para gerenciar usuários do sistema. A interface é intuitiva com badges visuais e avatares, e as operações de CRUD estão bem implementadas. O código está estruturado e fácil de manter, com tratamento adequado de erros e feedback visual através de toast notifications. A implementação atual é funcional, com espaço para melhorias em segurança e validação.

