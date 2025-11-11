# Documentação Técnica - Tela de Login

## Visão Geral

A tela de login é a página inicial do sistema CORE Estoque, responsável por autenticar usuários e controlar o acesso ao dashboard. Esta tela implementa um sistema de autenticação seguro usando NextAuth.js com credenciais.

**Arquivo:** `src/app/page.tsx`

---

## Funcionalidades

### 1. Autenticação de Usuários
- Validação de credenciais (login e senha)
- Integração com NextAuth.js para gerenciamento de sessão
- Redirecionamento automático para usuários já autenticados
- Tratamento de erros de autenticação

### 2. Interface do Usuário
- Design moderno com gradiente de fundo
- Formulário de login com validação
- Indicadores visuais de loading
- Mensagens de erro contextuais
- Campo "Lembrar-me" (UI apenas, não implementado)
- Link "Esqueceu a senha?" (UI apenas, não implementado)

### 3. Gerenciamento de Estado
- Estado de loading durante autenticação
- Estado de erro para exibição de mensagens
- Verificação de sessão ativa

---

## Tecnologias e Bibliotecas Utilizadas

### Core Framework
- **Next.js 15.5.2** - Framework React com App Router
  - `useRouter` - Navegação programática
  - `'use client'` - Componente cliente-side

### Autenticação
- **next-auth 4.24.11** - Sistema de autenticação
  - `signIn` - Função para autenticar usuários
  - `useSession` - Hook para verificar sessão atual

### UI Components (shadcn/ui)
- **@/components/ui/button** - Botão estilizado
- **@/components/ui/input** - Campo de entrada
- **@/components/ui/label** - Rótulo de formulário

### Ícones
- **lucide-react 0.542.0** - Biblioteca de ícones
  - `Lock` - Ícone de cadeado
  - `User` - Ícone de usuário
  - `AlertCircle` - Ícone de alerta

### Estilização
- **Tailwind CSS** - Framework CSS utility-first
  - Classes utilitárias para layout, cores, espaçamento
  - Gradientes personalizados
  - Animações (spinner de loading)

---

## Fluxo Completo do Código

### 1. Inicialização do Componente

```typescript
export default function Home() {
  // Estados locais
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Hooks do Next.js
  const router = useRouter();
  const { data: session, status } = useSession();
```

**O que acontece:**
- Componente funcional React com hooks
- Estados locais para gerenciar formulário e UI
- `useRouter` para navegação
- `useSession` para verificar autenticação

### 2. Verificação de Sessão Ativa

```typescript
useEffect(() => {
  if (status === 'authenticated' && session) {
    router.push('/dashboard');
  }
}, [session, status, router]);
```

**O que acontece:**
- `useEffect` monitora mudanças na sessão
- Se usuário já está autenticado, redireciona para dashboard
- Evita mostrar tela de login para usuários logados

### 3. Submissão do Formulário

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const result = await signIn('credentials', {
      login,
      senha,
      redirect: false,
    });

    if (result?.error) {
      setError('Login ou senha inválidos');
    } else if (result?.ok) {
      router.push('/dashboard');
    }
  } catch {
    setError('Erro interno do servidor');
  } finally {
    setLoading(false);
  }
};
```

**Fluxo detalhado:**
1. Previne comportamento padrão do formulário
2. Ativa estado de loading
3. Limpa erros anteriores
4. Chama `signIn` do NextAuth com credenciais
5. `redirect: false` evita redirecionamento automático
6. Se erro: exibe mensagem de erro
7. Se sucesso: redireciona para `/dashboard`
8. Em caso de exceção: exibe erro genérico
9. Desativa loading no `finally`

### 4. Renderização Condicional de Loading

```typescript
if (status === 'loading') {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1929] via-[#0d2238] to-[#1a2f4a]">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Carregando...</p>
      </div>
    </div>
  );
}
```

**O que acontece:**
- Enquanto NextAuth verifica sessão (`status === 'loading'`)
- Exibe spinner animado
- Previne flash de conteúdo não autenticado

### 5. Estrutura do Formulário

```typescript
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Mensagem de erro */}
  {error && (
    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
      <AlertCircle className="w-5 h-5" />
      <span className="text-sm">{error}</span>
    </div>
  )}
  
  {/* Campos de entrada */}
  {/* Botão de submit */}
</form>
```

**Componentes do formulário:**
- **Campo Login:** Input com ícone de usuário, validação HTML5 `required`
- **Campo Senha:** Input tipo password com ícone de cadeado
- **Checkbox "Lembrar-me":** UI apenas (não funcional)
- **Link "Esqueceu a senha?":** UI apenas (não funcional)
- **Botão Entrar:** Desabilitado durante loading, mostra "Entrando..." quando ativo

---

## Integração com Backend

### NextAuth Configuration

A autenticação é configurada em `src/lib/auth.ts`:

```typescript
CredentialsProvider({
  async authorize(credentials) {
    // Busca usuário no banco de dados
    const usuario = await prisma.usuarios.findFirst({
      where: { login: credentials.login, inativo: false }
    });
    
    // Valida senha (suporta hash bcrypt ou número)
    // Retorna objeto de usuário ou null
  }
})
```

**Fluxo de autenticação:**
1. Frontend envia credenciais via `signIn`
2. NextAuth chama `authorize` do provider
3. `authorize` consulta banco via Prisma
4. Valida senha (bcrypt ou comparação numérica)
5. Retorna objeto de usuário ou `null`
6. NextAuth cria sessão JWT se autenticação bem-sucedida

---

## Tratamento de Erros

### Erros de Autenticação
- **Credenciais inválidas:** `result?.error` → mensagem "Login ou senha inválidos"
- **Erro de servidor:** `catch` → mensagem "Erro interno do servidor"
- **Usuário inativo:** Rejeitado no `authorize` (usuário não encontrado)

### Estados de Erro
- Estado `error` armazena mensagem atual
- Exibição condicional com ícone de alerta
- Estilização com cores vermelhas (bg-red-50, border-red-200)

---

## Segurança

### Implementações de Segurança
1. **Validação no Cliente:** Campos obrigatórios com `required`
2. **Validação no Servidor:** NextAuth valida no backend
3. **Senha Ocultada:** Input tipo `password`
4. **Sessão JWT:** NextAuth usa JWT para sessões
5. **Verificação de Usuário Ativo:** Apenas usuários não inativos podem fazer login

### Melhorias Sugeridas
- Implementar rate limiting
- Adicionar CAPTCHA após tentativas falhas
- Implementar "Lembrar-me" com refresh tokens
- Implementar recuperação de senha
- Adicionar 2FA (autenticação de dois fatores)

---

## Estilização e Design

### Paleta de Cores
- **Fundo:** Gradiente escuro (`from-[#0a1929] via-[#0d2238] to-[#1a2f4a]`)
- **Card:** Branco com opacidade (`bg-white/95 backdrop-blur-sm`)
- **Primária:** Azul escuro (`#0a1929`, `#1a3a5a`)
- **Erro:** Vermelho (`bg-red-50`, `border-red-200`, `text-red-700`)

### Componentes Visuais
- **Card de Login:** Bordas arredondadas (`rounded-2xl`), sombra (`shadow-2xl`)
- **Ícones:** Posicionados dentro dos inputs (`absolute left-3`)
- **Botão:** Gradiente com hover, desabilitado durante loading
- **Spinner:** Animação CSS (`animate-spin`)

---

## Dependências do Package.json

```json
{
  "next": "15.5.2",
  "next-auth": "^4.24.11",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "lucide-react": "^0.542.0"
}
```

---

## Fluxograma de Autenticação

```
[Usuário acessa /]
    ↓
[NextAuth verifica sessão]
    ↓
[Status === 'loading'?]
    ├─ SIM → [Mostra spinner]
    └─ NÃO → [Status === 'authenticated'?]
              ├─ SIM → [Redireciona para /dashboard]
              └─ NÃO → [Mostra formulário de login]
                        ↓
                   [Usuário preenche e submete]
                        ↓
                   [signIn('credentials', {...})]
                        ↓
                   [NextAuth chama authorize()]
                        ↓
                   [Valida no banco de dados]
                        ↓
              [Autenticação bem-sucedida?]
              ├─ SIM → [Cria sessão JWT] → [Redireciona para /dashboard]
              └─ NÃO → [Exibe erro] → [Usuário tenta novamente]
```

---

## Observações Importantes

1. **Compatibilidade de Senha:** O sistema suporta senhas como hash bcrypt (string) ou número direto (para compatibilidade com dados legados)

2. **Redirecionamento:** Usuários autenticados são automaticamente redirecionados, evitando acesso desnecessário à tela de login

3. **Estado de Loading:** Dois estados de loading:
   - Verificação inicial de sessão (`status === 'loading'`)
   - Processamento de login (`loading` state)

4. **Funcionalidades Não Implementadas:**
   - "Lembrar-me" não persiste sessão
   - "Esqueceu a senha?" não tem funcionalidade
   - Link "Solicitar acesso" não funciona

5. **Responsividade:** Layout responsivo com classes Tailwind, adaptável a diferentes tamanhos de tela

---

## Conclusão

A tela de login é o ponto de entrada do sistema, implementando autenticação segura com NextAuth.js, interface moderna e tratamento adequado de erros. O código segue boas práticas do React e Next.js, com separação clara de responsabilidades entre frontend e backend.

