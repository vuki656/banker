import { z } from 'zod'

export const transactionUpdateValidation = z.object({
    amount: z
        .number({ invalid_type_error: 'Required' })
        .transform((value) => {
            return Number(value)
        }),
    categoryId: z
        .string()
        .nullable(),
    currency: z.string(),
    date: z.string(),
    description: z.string(),
})
