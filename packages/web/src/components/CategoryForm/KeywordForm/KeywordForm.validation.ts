import { z } from 'zod'

export const keywordValidation = z.object({
    id: z.string(),
    name: z.string(),
})
