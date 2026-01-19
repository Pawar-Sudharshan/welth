// lib/prisma.js
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis

const connectionString = process.env.DIRECT_URL

const pool = new Pool({
  connectionString,
})

const adapter = new PrismaPg(pool)

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}
