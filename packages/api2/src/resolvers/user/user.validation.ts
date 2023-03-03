import { z } from 'zod'

const emailValidation = z
        .string()
        .min(1)
        .max(300)

export const updateUserValidation = z.object({
    email: emailValidation,
    firstName: z
        .string()
        .min(1)
        .max(200),
    id: z
        .string()
        .uuid(),
    lastName: z
        .string()
        .min(1)
        .max(200),
    currency: z
        .string()
        .min(3)
        .max(3),
})

export const loginUserValidation = z.object({
    email: emailValidation,
    password: z
        .string()
        .min(1)
        .max(500)
})

export const deleteUserValidation = z.object({
    id: z
        .string()
        .uuid(),
})

export const userValidation = z.object({
    id: z
        .string()
        .uuid(),
})

export const usersValidation = z.object({
    skip: z
        .number()
        .int()
        .nullish(),
})
