import { z } from 'zod'

export const categoryValidation = z.object({
    color: z
        .string()
        .min(1, 'Required'),
    icon: z
        .string()
        .min(1, 'Required'),
    keywords: z
        .array(
            z.object({
                id: z.string(),
                name: z
                    .string()
                    .min(1, 'Required'),
            })
        ),
    name: z
        .string()
        .min(1, 'Required')
        .max(200, 'Can\'t be longer than 200 characters'),
})
