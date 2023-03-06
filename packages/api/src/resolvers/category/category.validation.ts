import { z } from 'zod'

export const categoryQueryValidation = z.object({
    id: z
        .string()
        .uuid(),
})

export const deleteCategoryMutationValidation = z.object({
    id: z
        .string()
        .uuid(),
})

export const createCategoryMutationValidation = z.object({
    color: z
        .string()
        .min(1)
        .max(200),
    icon: z
        .string()
        .min(1)
        .max(200),
    keywords: z
        .string()
        .min(1)
        .max(200)
        .array(),
    name: z
        .string()
        .min(1)
        .max(200),
})

export const updateCategoryMutationValidation = z.object({
    color: z
        .string()
        .min(1)
        .max(200),
    icon: z
        .string()
        .min(1)
        .max(200),
    id: z
        .string()
        .uuid(),
    keywords: z
        .string()
        .min(1)
        .max(200)
        .array(),
    name: z
        .string()
        .min(1)
        .max(200),
})
