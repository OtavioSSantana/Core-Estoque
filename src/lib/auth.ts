import NextAuth, { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        login: { label: 'Login', type: 'text' },
        senha: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.senha) {
          return null;
        }

        try {
          const usuario = await prisma.usuarios.findFirst({
            where: {
              login: credentials.login,
              inativo: false
            }
          });

          if (!usuario) {
            return null;
          }

          // Verificar se a senha está armazenada como hash ou como número
          let senhaValida = false;
          
          if (typeof usuario.senha === 'string') {
            // Se for string, assume que é hash bcrypt
            senhaValida = await bcrypt.compare(credentials.senha, usuario.senha);
          } else if (typeof usuario.senha === 'number') {
            // Se for número, compara diretamente (para compatibilidade com dados existentes)
            senhaValida = usuario.senha.toString() === credentials.senha;
          }

          if (!senhaValida) {
            return null;
          }

          return {
            id: usuario.id.toString(),
            name: usuario.nome,
            email: usuario.email,
            login: usuario.login || undefined,
            setor: usuario.setor || undefined,
            loja: usuario.loja || undefined
          };
        } catch (error) {
          // Tratamento específico para erros de conexão com banco de dados
          const errorMessage = error instanceof Error ? error.message : String(error);
          const errorCode = (error as { code?: string })?.code;
          
          if (errorCode === 'P1001' || errorMessage.includes('Can\'t reach database server')) {
            console.error('Erro de conexão com o banco de dados:', errorMessage);
            throw new Error('Servidor de banco de dados não está acessível. Verifique sua conexão.');
          }
          console.error('Erro na autenticação:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.login = user.login;
        token.setor = user.setor;
        token.loja = user.loja;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || '';
        session.user.login = token.login;
        session.user.setor = token.setor;
        session.user.loja = token.loja;
      }
      return session;
    }
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Exportar handlers para NextAuth v4 (usado em route.ts)
export const handlers = NextAuth(authOptions);

// Exportar função auth para uso em Server Actions e Server Components
export const auth = async () => {
  return await getServerSession(authOptions);
};
