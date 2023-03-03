import type { Prisma } from '@prisma/client'

export const userSelect: Prisma.UserSelect = {
    id: true,
    lastName: true,
    firstName: true,
    email: true,
    currency: true,
}
