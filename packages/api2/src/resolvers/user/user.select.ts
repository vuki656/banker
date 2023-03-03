import type { Prisma } from '@prisma/client'

export const userSelect = {
    id: true,
    lastName: true,
    firstName: true,
    email: true,
    currency: true,
} satisfies Prisma.UserSelect
