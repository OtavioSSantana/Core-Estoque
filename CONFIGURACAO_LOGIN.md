# Configuração do Sistema de Login

## 1. Criar arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=core-estoque-secret-key-2025-super-secure
DATABASE_URL="postgresql://postgres:UjqGIQAHcosfvTiFwBGEZgMoJQSUaLje@hopper.proxy.rlwy.net:54004/railway"
```

## 2. Como criar o arquivo .env.local

### No Windows (PowerShell):
```powershell
echo NEXTAUTH_URL=http://localhost:3000 > .env.local
echo NEXTAUTH_SECRET=core-estoque-secret-key-2025-super-secure >> .env.local
echo DATABASE_URL="postgresql://postgres:UjqGIQAHcosfvTiFwBGEZgMoJQSUaLje@hopper.proxy.rlwy.net:54004/railway" >> .env.local
```

### No Windows (CMD):
```cmd
echo NEXTAUTH_URL=http://localhost:3000 > .env.local
echo NEXTAUTH_SECRET=core-estoque-secret-key-2025-super-secure >> .env.local
echo DATABASE_URL="postgresql://postgres:UjqGIQAHcosfvTiFwBGEZgMoJQSUaLje@hopper.proxy.rlwy.net:54004/railway" >> .env.local
```

### Manualmente:
1. Crie um arquivo chamado `.env.local` na raiz do projeto
2. Cole o conteúdo acima no arquivo
3. Salve o arquivo

## 3. Reiniciar o servidor

Após criar o arquivo `.env.local`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 4. Testar o login

1. Acesse `http://localhost:3000`
2. Use as credenciais de um usuário ativo do banco:
   - Login: `ADMIN`
   - Senha: `123456`

## 5. Estrutura do Sistema

- **Página de Login**: `app/page.tsx`
- **Configuração NextAuth**: `app/lib/auth.ts`
- **API NextAuth**: `app/api/auth/[...nextauth]/route.ts`
- **Middleware de Proteção**: `middleware.ts`
- **Layout Protegido**: `app/dashboard/layout.tsx`

## 6. Funcionalidades

- ✅ Login com credenciais da tabela `usuarios`
- ✅ Proteção automática de rotas do dashboard
- ✅ Logout funcional
- ✅ Redirecionamento automático
- ✅ Compatibilidade com senhas numéricas existentes
- ✅ Informações do usuário na sidebar

## 7. Solução de Problemas

Se ainda houver problemas:

1. **Verifique se o arquivo `.env.local` foi criado corretamente**
2. **Reinicie o servidor após criar o arquivo**
3. **Verifique se existe um usuário ativo no banco com `inativo = false`**
4. **Verifique o console do navegador (F12) para erros**
