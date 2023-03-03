import type { Prisma } from '@prisma/client'

export const userSelect = {
    currency: true,
    email: true,
    firstName: true,
    id: true,
    lastName: true,
} satisfies Prisma.UserSelect
