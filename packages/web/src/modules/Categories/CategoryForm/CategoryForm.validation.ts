import { z } from 'zod'

import { keywordValidation } from '../KeywordForm'

export const categoryFormValidation = z.object({
    color: z
        .string()
        .min(1, 'Required'),
    icon: z
        .string()
        .min(1, 'Required'),
    keywords: z.array(keywordValidation),
    name: z
        .string()
        .min(1, 'Required')
        .max(200, 'Can\'t be longer than 200 characters'),
})
