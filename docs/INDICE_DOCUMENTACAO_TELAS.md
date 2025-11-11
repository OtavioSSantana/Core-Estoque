# Índice de Documentação Técnica - Telas do Sistema

Este documento serve como índice para toda a documentação técnica das telas do sistema CORE Estoque.

---

## 📋 Documentos Disponíveis

### 1. [Tela de Login](./DOCUMENTACAO_TELA_LOGIN.md)
**Arquivo:** `src/app/page.tsx`

Documentação completa da tela de autenticação do sistema, incluindo:
- Funcionalidades de login e autenticação
- Integração com NextAuth.js
- Fluxo completo de autenticação
- Tratamento de erros e segurança
- Bibliotecas e tecnologias utilizadas

---

### 2. [Tela de Dashboard](./DOCUMENTACAO_TELA_DASHBOARD.md)
**Arquivo:** `src/app/dashboard/page.tsx`

Documentação da tela principal do dashboard, incluindo:
- Redirecionamento automático para Estoque
- Código original comentado (estatísticas e gráficos)
- Estrutura planejada para implementação futura

---

### 3. [Tela de Gestão de Estoque](./DOCUMENTACAO_TELA_ESTOQUE.md)
**Arquivo:** `src/app/dashboard/estoque/page.tsx`

Documentação completa da funcionalidade principal do sistema, incluindo:
- Visualização e filtragem de estoque
- Seleção múltipla de itens
- Movimentações (entrada, saída, transferências, ajustes)
- Tipos de movimentação suportados
- Integração com API
- Fluxos detalhados de cada operação

---

### 4. [Tela de Gestão de Produtos](./DOCUMENTACAO_TELA_PRODUTOS.md)
**Arquivo:** `src/app/dashboard/produtos/page.tsx`

Documentação da tela de gerenciamento de produtos, incluindo:
- CRUD completo de produtos
- Busca e filtragem
- Modais de criação, edição e exclusão
- Validações e tratamento de erros
- Integração com API

---

### 5. [Tela de Gestão de Lojas](./DOCUMENTACAO_TELA_LOJAS.md)
**Arquivo:** `src/app/dashboard/lojas/page.tsx`

Documentação da tela de gerenciamento de lojas e depósitos, incluindo:
- Visualização em cards
- CRUD completo de lojas
- Resumo geral com estatísticas
- Layout responsivo
- Integração com API

---

### 6. [Tela de Gestão de Usuários](./DOCUMENTACAO_TELA_USUARIOS.md)
**Arquivo:** `src/app/dashboard/usuarios/page.tsx`

Documentação da tela de gerenciamento de usuários, incluindo:
- CRUD completo de usuários
- Ativação/desativação de contas
- Badges visuais de função e status
- Avatares com iniciais
- Resumo de usuários
- Integração com API

---

### 7. [Tela de Configurações](./DOCUMENTACAO_TELA_CONFIGURACOES.md)
**Arquivo:** `src/app/dashboard/configuracoes/page.tsx`

Documentação da tela de configurações do sistema, incluindo:
- Configurações gerais (empresa, regional)
- Configurações de notificações
- Configurações de segurança
- Configurações de aparência
- Sistema de abas (tabs)
- Status de implementação (UI completa, salvamento não implementado)

---

### 8. [Plano de Execução - Integração Tiny ERP](./PLANO_EXECUCAO_INTEGRACAO_TINY.md)
**Arquivo:** `docs/PLANO_EXECUCAO_INTEGRACAO_TINY.md`

Plano detalhado de execução para integração com Tiny ERP (Olist), incluindo:
- 8 fases de implementação completas
- Checklist detalhado para cada fase
- Código de exemplo e estruturas
- Configuração de cron jobs na Vercel
- Troubleshooting e soluções comuns
- Tempo estimado: 3h 15min

---

## 🛠️ Tecnologias Principais Utilizadas

### Framework e Bibliotecas Core
- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0** - Biblioteca UI
- NextAuth 4.24.11 - Autenticação
- **Prisma 6.16.3** - ORM para banco de dados

### UI Components
- **shadcn/ui** - Componentes UI reutilizáveis
- **Tailwind CSS** - Framework CSS utility-first
- **lucide-react** - Biblioteca de ícones

### Outras Bibliotecas
- **Zod** - Validação de schemas
- **bcryptjs** - Hash de senhas
- **class-variance-authority** - Variantes de componentes

---

## 📊 Estrutura do Projeto

```
src/app/
├── page.tsx                          # Tela de Login
├── dashboard/
│   ├── page.tsx                      # Dashboard (redireciona)
│   ├── estoque/
│   │   └── page.tsx                  # Gestão de Estoque
│   ├── produtos/
│   │   └── page.tsx                  # Gestão de Produtos
│   ├── lojas/
│   │   └── page.tsx                  # Gestão de Lojas
│   ├── usuarios/
│   │   └── page.tsx                  # Gestão de Usuários
│   └── configuracoes/
│       └── page.tsx                  # Configurações
```

---

## 🔍 Como Usar Esta Documentação

1. **Para entender uma tela específica:**
   - Acesse o documento correspondente na lista acima
   - Leia a seção "Visão Geral" para contexto
   - Explore "Fluxo Completo do Código" para detalhes técnicos

2. **Para implementar funcionalidades:**
   - Consulte a seção "Integração com API"
   - Veja exemplos de código nas seções de fluxo
   - Verifique "Melhorias Sugeridas" para ideias

3. **Para debugar problemas:**
   - Verifique "Tratamento de Erros"
   - Consulte "Fluxograma de Operações"
   - Revise "Estados de Loading"

4. **Para entender tecnologias:**
   - Veja seção "Tecnologias e Bibliotecas Utilizadas"
   - Consulte "Estrutura de Dados"
   - Verifique dependências no `package.json`

---

## 📝 Notas Importantes

### Status de Implementação
- ✅ **Login:** Totalmente implementado e funcional
- ✅ **Dashboard:** Redirecionamento implementado, dashboard completo comentado
- ✅ **Estoque:** Totalmente implementado e funcional
- ✅ **Produtos:** Totalmente implementado e funcional
- ✅ **Lojas:** Totalmente implementado e funcional
- ✅ **Usuários:** Totalmente implementado e funcional
- ⚠️ **Configurações:** UI completa, funcionalidade de salvamento não implementada

### Padrões de Código
- Todas as telas usam componentes funcionais do React
- Estado gerenciado com hooks (`useState`, `useEffect`, `useCallback`)
- Integração com API via `fetch`
- Feedback visual com toast notifications
- Tratamento de erros consistente

### Segurança
- Autenticação via NextAuth.js
- Validação de permissões (admin vs. usuário comum)
- Proteção de rotas no middleware
- Validação de dados no frontend e backend

---

## 🔗 Documentação Relacionada

- [Documentação do Banco de Dados](./DOCUMENTACAO_BANCO_DADOS.md)
- [Especificação de Estoque](./ESPECIFICACAO_ESTOQUE.md)
- [Guia de Boas Práticas](./GUIA_DE_BOAS_PRATICAS.md)
- [Plano de Execução - Integração Tiny ERP](./PLANO_EXECUCAO_INTEGRACAO_TINY.md)

---

## 📅 Última Atualização

Documentação criada em: **2025**

Todos os documentos foram criados com base na análise completa do código-fonte do projeto, incluindo:
- Análise de componentes React
- Análise de integrações com API
- Análise de fluxos de dados
- Análise de bibliotecas e dependências
- Análise de estrutura de banco de dados

---

## 💡 Dicas para Desenvolvedores

1. **Leia primeiro:** Sempre comece pela "Visão Geral" de cada documento
2. **Fluxos:** Os fluxogramas ajudam a entender o comportamento completo
3. **Código:** Exemplos de código estão nas seções de fluxo
4. **API:** Consulte seção de integração para entender endpoints
5. **Melhorias:** Veja "Melhorias Sugeridas" para ideias de evolução

---

**Documentação criada para facilitar o entendimento completo do sistema CORE Estoque.**

