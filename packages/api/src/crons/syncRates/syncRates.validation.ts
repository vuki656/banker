import { z } from 'zod'

import { currencyCodeValidation } from '../../resolvers/transaction/graphql'

export const ratesValidation = z.object({
    base: currencyCodeValidation,
    disclaimer: z.string(),
    license: z.string(),
    rates: z.record(z.number()),
    timestamp: z
        .number()
        .int(),
})
