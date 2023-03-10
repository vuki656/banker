import { TransactionStatus } from '@prisma/client'
import { z } from 'zod'

export const currencyCodeValidation = z
    .string()
    .length(3)

export const updateTransactionMutationValidation = z.object({
    amount: z.number(),
    categoryId: z
        .string()
        .uuid()
        .nullish(),
    currency: currencyCodeValidation,
    date: z.date(),
    description: z.string(),
    id: z
        .string()
        .uuid(),
    status: z.nativeEnum(TransactionStatus),
})

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
    status: z.nativeEnum(TransactionStatus),
})

export const transactionsQueryValidation = z.object({
    categoryId: z
        .string()
        .uuid()
        .nullish(),
    endDate: z
        .string()
        .datetime()
        .nullish(),
    startDate: z
        .string()
        .datetime()
        .nullish(),
})

