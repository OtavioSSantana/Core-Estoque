// lib/prisma.ts

import { PrismaClient } from '@/generated/prisma/index.js';

// Declaração global para o Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Declara a variável global para o cliente Prisma
let prisma: PrismaClient;

// Verifica se estamos em produção para evitar criar múltiplas instâncias
// em ambiente de desenvolvimento devido ao hot-reloading do Next.js
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
