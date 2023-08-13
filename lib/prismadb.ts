import { PrismaClient } from "@prisma/client";

const globalThisForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismadb =
  globalThisForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production")
  globalThisForPrisma.prisma = prismadb;

export default prismadb;
