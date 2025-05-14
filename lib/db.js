import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: ['query', 'error', 'warn'],
    connectionTimeout: 20000,
    pool: {
      min: 0,
      max: 10,
      idleTimeoutMillis: 30000
    }
  })
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma