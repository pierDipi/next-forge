import 'server-only';

import {PrismaClient} from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const database: PrismaClient = globalForPrisma.prisma || new PrismaClient()

globalForPrisma.prisma = database
