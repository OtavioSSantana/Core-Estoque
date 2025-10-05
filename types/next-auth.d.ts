import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      login?: string;
      setor?: number | null;
      loja?: number | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    login?: string;
    setor?: number | null;
    loja?: number | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    login?: string;
    setor?: number | null;
    loja?: number | null;
  }
}
