import type { Prisma } from '@prisma/client'

export const transactionSelect = {
    id: true,
    amount: true,
    reference: true,
    status: true,
    currency: true,
    description: true,
    date: true,
} satisfies Prisma.TransactionSelect
