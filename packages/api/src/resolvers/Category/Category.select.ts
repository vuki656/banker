import type { Prisma } from '@prisma/client'

const makeCategorySelect = <TSelect extends Prisma.CategorySelect>(
    select: Prisma.Subset<TSelect, Prisma.CategorySelect>,
): TSelect => {
    return select
}

export const CATEGORY_DEFAULT_SELECT = () => {
    return makeCategorySelect({
        color: true,
        icon: true,
        id: true,
        name: true,
    })
}
