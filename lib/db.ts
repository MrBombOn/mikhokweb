/**
 * @file Prisma kliens singleton (fejlesztői HMR-barát)
 *
 * @description
 * Next.js fejlesztői módban a modul **többször újratöltődhet**. Ha minden importnál
 * új `PrismaClient()` készülne, gyorsan elfogynának a DB kapcsolatok. Ezért a kliens
 * `globalThis`-re cachelődik **nem production** környezetben.
 *
 * @használat
 * `import { prisma } from '@/lib/db'` – lekérdezések a `schema.prisma` modellekre.
 *
 * @környezet
 * `DATABASE_URL` szükséges futáskor (lásd `.env.example`).
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
