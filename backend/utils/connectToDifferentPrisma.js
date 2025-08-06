import {PrismaClient } from '@prisma/client'

let prisma = null

async function connectToDatabase(databaseUrl) {
  // Disconnect if already connected
  if (prisma) {
    await prisma.$disconnect()
  }

  // Create new Prisma client with custom database URL
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })

  await prisma.$connect()
  return prisma
}
