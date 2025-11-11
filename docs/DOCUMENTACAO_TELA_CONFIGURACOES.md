# Documentação Técnica - Tela de Configurações

## Visão Geral

A tela de Configurações oferece uma interface para gerenciar configurações do sistema e preferências do usuário. A tela está organizada em abas (tabs) para diferentes categorias de configurações: Geral, Notificações, Segurança e Aparência.

**Arquivo:** `src/app/dashboard/configuracoes/page.tsx`

**Status:** Interface implementada, funcionalidades de salvamento não implementadas (apenas UI)

---

## Funcionalidades Principais

### 1. Configurações Gerais
- Informações da empresa (nome, CNPJ, email, telefone, endereço)
- Configurações regionais (fuso horário, moeda)

### 2. Configurações de Notificações
- Preferências de notificação (email, SMS, navegador)
- Tipos de alertas (estoque baixo, novas vendas, transferências, novos usuários)

### 3. Configurações de Segurança
- Autenticação de dois fatores
- Timeout de sessão
- Restrição por IP
- Política de senhas (comprimento mínimo, expiração, requisitos)

### 4. Configurações de Aparência
- Tema do sistema (claro, escuro, sistema)
- Cor principal
- Modo compacto

---

## Tecnologias e Bibliotecas Utilizadas

### Core Framework
- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0**
  - Componente funcional simples (sem hooks de estado)

### UI Components (shadcn/ui)
- **@/components/ui/card** - Cards para seções
- **@/components/ui/label** - Rótulos
- **@/components/ui/input** - Campos de entrada
- **@/components/ui/switch** - Toggles on/off
- **@/components/ui/button** - Botões
- **@/components/ui/tabs** - Sistema de abas

### Ícones
- **lucide-react 0.542.0**
  - `Building` - Empresa
  - `Bell` - Notificações
  - `Shield` - Segurança
  - `Palette` - Aparência
  - `Save` - Salvar
  - `Mail` - Email
  - `Smartphone` - SMS
  - `Monitor` - Navegador
  - `Globe` - Configurações regionais

---

## Estrutura da Tela

### Sistema de Abas (Tabs)

```typescript
<Tabs defaultValue="general" className="space-y-6">
  <TabsList className="grid w-full max-w-2xl grid-cols-4">
    <TabsTrigger value="general">Geral</TabsTrigger>
    <TabsTrigger value="notifications">Notificações</TabsTrigger>
    <TabsTrigger value="security">Segurança</TabsTrigger>
    <TabsTrigger value="appearance">Aparência</TabsTrigger>
  </TabsList>
  
  <TabsContent value="general">...</TabsContent>
  <TabsContent value="notifications">...</TabsContent>
  <TabsContent value="security">...</TabsContent>
  <TabsContent value="appearance">...</TabsContent>
</Tabs>
```

**Organização:**
- 4 abas principais
- Conteúdo específico em cada aba
- Navegação entre abas

---

## Aba: Configurações Gerais

### Informações da Empresa

```typescript
<Card className="p-6">
  <div className="flex items-center gap-3 mb-6">
    <Building className="w-5 h-5 text-primary" />
    <h2 className="text-xl font-semibold">Informações da Empresa</h2>
  </div>
  <div className="grid gap-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Nome da Empresa</Label>
        <Input id="companyName" defaultValue="Core Estoque LTDA" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input id="cnpj" defaultValue="12.345.678/0001-90" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Principal</Label>
        <Input id="email" type="email" defaultValue="contato@coreestoque.com.br" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone Principal</Label>
        <Input id="phone" defaultValue="(11) 9876-5432" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="address">Endereço da Matriz</Label>
      <Input id="address" defaultValue="Rua das Empresas, 123 - São Paulo, SP" />
    </div>
  </div>
</Card>
```

**Campos:**
- Nome da Empresa
- CNPJ
- Email Principal
- Telefone Principal
- Endereço da Matriz

**Layout:**
- Grid responsivo (2 colunas no desktop, 1 no mobile)
- Campos organizados logicamente

### Configurações Regionais

```typescript
<Card className="p-6">
  <div className="flex items-center gap-3 mb-6">
    <Globe className="w-5 h-5 text-primary" />
    <h2 className="text-xl font-semibold">Configurações Regionais</h2>
  </div>
  <div className="grid gap-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="timezone">Fuso Horário</Label>
        <Input id="timezone" defaultValue="America/Sao_Paulo (GMT-3)" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currency">Moeda</Label>
        <Input id="currency" defaultValue="Real (BRL)" readOnly />
      </div>
    </div>
  </div>
</Card>
```

**Observação:** Campos `readOnly` - não editáveis (configurações fixas)

---

## Aba: Configurações de Notificações

### Preferências de Notificação

```typescript
<Card className="p-6">
  <div className="flex items-center gap-3 mb-6">
    <Bell className="w-5 h-5 text-primary" />
    <h2 className="text-xl font-semibold">Preferências de Notificação</h2>
  </div>
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="emailNotifications" className="text-base">
          <Mail className="w-4 h-4 inline-block mr-2" />
          Notificações por Email
        </Label>
        <p className="text-sm text-muted-foreground">
          Receba alertas importantes por email
        </p>
      </div>
      <Switch id="emailNotifications" defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="smsNotifications" className="text-base">
          <Smartphone className="w-4 h-4 inline-block mr-2" />
          Notificações por SMS
        </Label>
        <p className="text-sm text-muted-foreground">
          Receba alertas críticos por SMS
        </p>
      </div>
      <Switch id="smsNotifications" />
    </div>
    
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="browserNotifications" className="text-base">
          <Monitor className="w-4 h-4 inline-block mr-2" />
          Notificações do Navegador
        </Label>
        <p className="text-sm text-muted-foreground">
          Receba notificações em tempo real no navegador
        </p>
      </div>
      <Switch id="browserNotifications" defaultChecked />
    </div>
  </div>
</Card>
```

**Switches:**
- Email: Ativado por padrão
- SMS: Desativado por padrão
- Navegador: Ativado por padrão

### Tipos de Alertas

```typescript
<Card className="p-6">
  <h3 className="text-lg font-semibold mb-4">Tipos de Alertas</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Label htmlFor="lowStock">Estoque Baixo</Label>
      <Switch id="lowStock" defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <Label htmlFor="newSales">Novas Vendas</Label>
      <Switch id="newSales" defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <Label htmlFor="transfers">Transferências de Estoque</Label>
      <Switch id="transfers" defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <Label htmlFor="newUsers">Novos Usuários</Label>
      <Switch id="newUsers" />
    </div>
  </div>
</Card>
```

**Tipos:**
- Estoque Baixo: Ativado
- Novas Vendas: Ativado
- Transferências: Ativado
- Novos Usuários: Desativado

---

## Aba: Configurações de Segurança

### Configurações de Segurança

```typescript
<Card className="p-6">
  <div className="flex items-center gap-3 mb-6">
    <Shield className="w-5 h-5 text-primary" />
    <h2 className="text-xl font-semibold">Configurações de Segurança</h2>
  </div>
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="twoFactor" className="text-base">
          Autenticação de Dois Fatores
        </Label>
        <p className="text-sm text-muted-foreground">
          Adicione uma camada extra de segurança à sua conta
        </p>
      </div>
      <Switch id="twoFactor" />
    </div>
    
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="sessionTimeout" className="text-base">
          Timeout de Sessão
        </Label>
        <p className="text-sm text-muted-foreground">
          Desconectar automaticamente após inatividade
        </p>
      </div>
      <Switch id="sessionTimeout" defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="ipRestriction" className="text-base">
          Restrição por IP
        </Label>
        <p className="text-sm text-muted-foreground">
          Permitir acesso apenas de IPs autorizados
        </p>
      </div>
      <Switch id="ipRestriction" />
    </div>
  </div>
</Card>
```

**Configurações:**
- 2FA: Desativado
- Timeout: Ativado
- Restrição IP: Desativado

### Política de Senhas

```typescript
<Card className="p-6">
  <h3 className="text-lg font-semibold mb-4">Política de Senhas</h3>
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="minLength">Comprimento Mínimo</Label>
        <Input id="minLength" type="number" defaultValue="8" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiration">Expiração (dias)</Label>
        <Input id="expiration" type="number" defaultValue="90" />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch id="requireUpper" defaultChecked />
        <Label htmlFor="requireUpper">Maiúsculas</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="requireNumber" defaultChecked />
        <Label htmlFor="requireNumber">Números</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="requireSpecial" defaultChecked />
        <Label htmlFor="requireSpecial">Caracteres Especiais</Label>
      </div>
    </div>
  </div>
</Card>
```

**Configurações:**
- Comprimento mínimo: 8 caracteres
- Expiração: 90 dias
- Maiúsculas: Obrigatório
- Números: Obrigatório
- Especiais: Obrigatório

---

## Aba: Configurações de Aparência

### Aparência e Tema

```typescript
<Card className="p-6">
  <div className="flex items-center gap-3 mb-6">
    <Palette className="w-5 h-5 text-primary" />
    <h2 className="text-xl font-semibold">Aparência e Tema</h2>
  </div>
  <div className="space-y-6">
    <div className="space-y-2">
      <Label>Tema do Sistema</Label>
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="justify-start">
          ☀️ Claro
        </Button>
        <Button variant="outline" className="justify-start">
          🌙 Escuro
        </Button>
        <Button variant="outline" className="justify-start">
          💻 Sistema
        </Button>
      </div>
    </div>
    
    <div className="space-y-2">
      <Label>Cor Principal</Label>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-md bg-primary cursor-pointer border-2 border-primary" />
        <div className="w-10 h-10 rounded-md bg-green-500 cursor-pointer border-2 border-transparent hover:border-green-500" />
        <div className="w-10 h-10 rounded-md bg-blue-500 cursor-pointer border-2 border-transparent hover:border-blue-500" />
        <div className="w-10 h-10 rounded-md bg-yellow-500 cursor-pointer border-2 border-transparent hover:border-yellow-500" />
        <div className="w-10 h-10 rounded-md bg-red-500 cursor-pointer border-2 border-transparent hover:border-red-500" />
      </div>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="compactMode" className="text-base">
          Modo Compacto
        </Label>
        <p className="text-sm text-muted-foreground">
          Reduzir espaçamentos para ver mais informações
        </p>
      </div>
      <Switch id="compactMode" />
    </div>
  </div>
</Card>
```

**Opções:**
- **Tema:** Claro, Escuro, Sistema (seguir preferência do OS)
- **Cor Principal:** 5 opções de cores (primária, verde, azul, amarelo, vermelho)
- **Modo Compacto:** Desativado por padrão

---

## Botão de Salvar

```typescript
<div className="flex justify-end">
  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
    <Save className="w-4 h-4 mr-2" />
    Salvar Alterações
  </Button>
</div>
```

**Observação:** Botão presente, mas funcionalidade de salvamento não implementada (apenas UI)

---

## Status de Implementação

### ✅ Implementado
- Interface completa com todas as abas
- Componentes visuais (inputs, switches, botões)
- Layout responsivo
- Organização lógica por categorias

### ❌ Não Implementado
- Persistência de configurações
- Integração com API
- Validação de formulários
- Aplicação de configurações (tema, cores, etc.)
- Funcionalidade do botão "Salvar Alterações"

---

## Estrutura de Dados Sugerida

### Para Implementação Futura

```typescript
interface Configuracoes {
  empresa: {
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
    endereco: string;
  };
  regional: {
    timezone: string;
    moeda: string;
  };
  notificacoes: {
    email: boolean;
    sms: boolean;
    navegador: boolean;
    tipos: {
      estoqueBaixo: boolean;
      novasVendas: boolean;
      transferencias: boolean;
      novosUsuarios: boolean;
    };
  };
  seguranca: {
    doisFatores: boolean;
    timeoutSessao: boolean;
    restricaoIP: boolean;
    politicaSenha: {
      comprimentoMinimo: number;
      expiracaoDias: number;
      requerMaiusculas: boolean;
      requerNumeros: boolean;
      requerEspeciais: boolean;
    };
  };
  aparencia: {
    tema: 'claro' | 'escuro' | 'sistema';
    corPrincipal: string;
    modoCompacto: boolean;
  };
}
```

---

## Integração com API (Sugerida)

### Endpoints Necessários

1. **GET /api/configuracoes**
   - Retorna: Configurações atuais
   - Usado: Carregar valores iniciais

2. **PUT /api/configuracoes**
   - Body: Objeto de configurações
   - Retorna: Confirmação
   - Usado: Salvar alterações

3. **GET /api/configuracoes/empresa**
   - Retorna: Configurações da empresa
   - Usado: Carregar dados da empresa

4. **PUT /api/configuracoes/empresa**
   - Body: Dados da empresa
   - Usado: Atualizar dados da empresa

---

## Fluxograma de Implementação Futura

### Carregamento de Configurações

```
[Componente monta]
    ↓
[GET /api/configuracoes]
    ↓
[Preenche formulários com valores]
    ↓
[Usuário edita configurações]
    ↓
[Usuário clica "Salvar Alterações"]
    ↓
[Validação de campos]
    ├─ Inválido → [Exibe erros]
    └─ Válido → [PUT /api/configuracoes]
                  ↓
            [API salva configurações]
                  ↓
          [Sucesso?]
          ├─ SIM → [Toast de sucesso] → [Aplica configurações]
          └─ NÃO → [Toast de erro]
```

### Aplicação de Configurações

```
[Configurações salvas]
    ↓
[Aplica tema (se alterado)]
    ↓
[Aplica cor principal (se alterado)]
    ↓
[Aplica modo compacto (se alterado)]
    ↓
[Atualiza preferências de notificação]
    ↓
[Configurações aplicadas]
```

---

## Melhorias Sugeridas

1. **Implementação de Persistência:**
   - Criar API de configurações
   - Salvar no banco de dados
   - Carregar valores ao montar componente

2. **Validação:**
   - Validação de CNPJ
   - Validação de email
   - Validação de telefone
   - Validação de formato de endereço

3. **Aplicação de Tema:**
   - Integração com sistema de temas
   - Aplicar tema dinamicamente
   - Persistir preferência no localStorage

4. **Funcionalidades:**
   - Preview de tema antes de salvar
   - Reset para padrões
   - Exportar/importar configurações

5. **UX:**
   - Indicador de alterações não salvas
   - Confirmação antes de sair com alterações
   - Feedback visual ao salvar

6. **Segurança:**
   - Validação de IPs na restrição
   - Implementação real de 2FA
   - Aplicação de política de senhas

---

## Conclusão

A tela de Configurações oferece uma interface completa e bem organizada para gerenciar configurações do sistema. A estrutura está preparada para implementação futura de funcionalidades de persistência e aplicação de configurações. O código está bem estruturado com separação clara por abas e categorias, facilitando manutenção e extensão futura. A implementação atual serve como base sólida para adicionar funcionalidades de salvamento e aplicação de configurações.

