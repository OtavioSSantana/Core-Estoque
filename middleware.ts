import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Middleware adicional pode ser adicionado aqui se necessário
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acesso à página inicial (login)
        if (req.nextUrl.pathname === '/') {
          return true;
        }
        
        // Proteger todas as rotas do dashboard
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token;
        }
        
        // Proteger todas as rotas da API (exceto auth)
        if (req.nextUrl.pathname.startsWith('/api') && !req.nextUrl.pathname.startsWith('/api/auth')) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
