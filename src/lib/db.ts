import { PrismaClient } from "@/prisma/index"
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export default prisma
