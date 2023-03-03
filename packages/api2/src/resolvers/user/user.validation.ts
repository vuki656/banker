import { z } from 'zod'

const emailValidation = z
        .string()
        .min(1)
        .max(300)

export const userValidation = z.object({
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


export const updateUserMutationValidation = userValidation

export const loginUserMutationValidation = z.object({
    email: emailValidation,
    password: z
        .string()
        .min(1)
        .max(500)
})

export const deleteUserMutationValidation = z.object({
    id: z
        .string()
        .uuid(),
})
