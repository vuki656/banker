import type { Prisma } from '@prisma/client'

const makeKeywordSelect = <TSelect extends Prisma.KeywordSelect>(
    select: Prisma.Subset<TSelect, Prisma.KeywordSelect>,
): TSelect => {
    return select
}

export const KEYWORD_DEFAULT_SELECT = () => {
    return makeKeywordSelect({
        id: true,
        name: true,
    })
}
