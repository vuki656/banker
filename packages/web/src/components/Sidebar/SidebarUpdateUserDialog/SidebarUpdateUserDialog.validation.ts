import { z } from 'zod'

export const userValidation = z.object({
    currency: z.string(),
    email: z
        .string()
        .min(2, 'Must be at least 2 characters')
        .max(50, 'Can\'t be longer than 50 characters'),
    firstName: z
        .string()
        .min(2, 'Must be at least 2 characters')
        .max(50, 'Can\'t be longer than 50 characters'),
    lastName: z
        .string()
        .min(2, 'Must be at least 2 characters')
        .max(50, 'Can\'t be longer than 50 characters'),
})

export type UserFormType = z.infer<typeof userValidation>
