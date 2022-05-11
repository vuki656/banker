import { z } from 'zod'

export const loginFormValidationSchema = z.object({
    email: z
        .string()
        .min(1, 'Required'),
    password: z
        .string()
        .min(1, 'Required'),
})
