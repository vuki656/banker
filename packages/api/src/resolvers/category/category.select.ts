import type { Prisma } from '@prisma/client'

export const categorySelect = {
    color: true,
    icon: true,
    id: true,
    name: true,
} satisfies Prisma.CategorySelect

export const keywordSelect = {
    id: true,
    name: true,
} satisfies Prisma.KeywordSelect
