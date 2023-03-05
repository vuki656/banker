import { z } from 'zod'

export const ratesValidation = z.object({
    base: z
        .string()
        .length(3),
    disclaimer: z.string(),
    license: z.string(),
    rates: z.record(z.number()),
    timestamp: z
        .number()
        .int(),
})
