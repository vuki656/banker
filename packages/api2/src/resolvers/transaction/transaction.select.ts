import type { Prisma } from '@prisma/client'

export const transactionSelect = {
    amount: true,
    currency: true,
    date: true,
    description: true,
    id: true,
    reference: true,
    status: true,
} satisfies Prisma.TransactionSelect
