import type { Prisma } from '@prisma/client'

import { CATEGORY_DEFAULT_SELECT } from '../Category'

const makeTransactionSelect = <TSelect extends Prisma.TransactionSelect>(
    select: Prisma.Subset<TSelect, Prisma.TransactionSelect>,
): TSelect => {
    return select
}

export const TRANSACTION_DEFAULT_SELECT = () => {
    return makeTransactionSelect({
        amount: true,
        category: {
            select: CATEGORY_DEFAULT_SELECT(),
        },
        currency: true,
        date: true,
        description: true,
        id: true,
        reference: true,
        status: true,
    })
}
