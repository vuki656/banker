import type { Prisma } from '@prisma/client'

import { KEYWORD_DEFAULT_SELECT } from '../../shared/selects'

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
        keywords: {
            orderBy: {
                name: 'asc',
            },
            select: KEYWORD_DEFAULT_SELECT(),
            where: {
                isDeleted: false,
            },
        },
        name: true,
    })
}
