import { z } from 'zod'
import { TransactionStatusEnum } from '../../../graphql/types.generated'

export const transactionUpdateValidation = z.object({
    status: z.nativeEnum(TransactionStatusEnum),
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
