import { TransactionStatus } from '@prisma/client'
import { z } from 'zod'

export const currencyCodeValidation = z
    .string()
    .length(3)

export const createTransactionMutationValidation = z.object({
    amount: z.number(),
    categoryId: z
        .string()
        .uuid()
        .nullish(),
    currency: currencyCodeValidation,
    date: z.date(),
    description: z.string(),
    reference: z.string(),
    status: z.nativeEnum(TransactionStatus)
})

export const transactionsQueryValidation = z.object({
    categoryId: z
        .string()
        .uuid(),
    endDate: z
        .string()
        .datetime()
        .nullish(),
    startDate: z
        .string()
        .datetime()
        .nullish(),
})

