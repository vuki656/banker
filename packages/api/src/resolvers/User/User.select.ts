import type { Prisma } from '@prisma/client'

const makeUserSelect = <TSelect extends Prisma.UserSelect>(
    select: Prisma.Subset<TSelect, Prisma.UserSelect>,
): TSelect => {
    return select
}

export const USER_DEFAULT_SELECT = () => {
    return makeUserSelect({
        currency: true,
        email: true,
        firstName: true,
        id: true,
        lastName: true,
    })
}
