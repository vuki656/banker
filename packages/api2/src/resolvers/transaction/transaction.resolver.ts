import { userId } from '@banker/api/src/database/seed/user'
import { TRANSACTION_DEFAULT_SELECT } from '@banker/api/src/resolvers'
import { convertTransaction } from '@banker/api/src/shared/utils'
import dayjs from 'dayjs'

import { orm } from '../../shared/orm'

import type { TransactionModule } from './resolver-types.generated'
import { transactionsQueryValidation } from './transaction.validation'

const CategoryResolver: TransactionModule.Resolvers = {
    Mutation: {},
    Query: {
        transactions: async (_, variables) => {
            const args = transactionsQueryValidation.parse(variables.args)

            const transactions = await orm.transaction.findMany({
                orderBy: {
                    date: 'desc',
                },
                select: TRANSACTION_DEFAUkT_SELECT(),
                where: {
                    AND: [
                        {
                            date: {
                                gte: args.startDate ?? dayjs()
                                    .subtract(30, 'year')
                                    .toDate(),
                            },
                        },
                        {
                            date: {
                                lte: args?.endDate ?? dayjs().toDate(),
                            },
                        },
                        {
                            category: {
                                id: args?.categoryId ?? undefined,
                            },
                        },
                    ],
                    isDeleted: false,
                    user: {
                        id: userId,
                    },
                },
            })

            const actions = transactions.map(async (transaction) => {
                return convertTransaction(transaction, userId)
            })

            return Promise.all(actions)
        },
    },
}

export default CategoryResolver
