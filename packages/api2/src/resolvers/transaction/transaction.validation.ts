import { z } from 'zod'

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

