 import { userId } from '@banker/api/src/database/seed/user'
import { TRANSACTION_DEFAULT_SELECT } from '@banker/api/src/resolvers'
import { convertTransaction } from '@banker/api/src/shared/utils'
import dayjs from 'dayjs'
import { GraphQLError } from 'graphql'

import { orm } from '../../shared/orm'
import { categorySelect, keywordSelect } from '../category'

import type { TransactionModule } from './resolver-types.generated'
import { transactionSelect } from './transaction.select'
import { transactionsQueryValidation } from './transaction.validation'

const TransactionResolver: TransactionModule.Resolvers = {
    Mutation: {},
    Query: {
        transactions: async (_, variables, context) => {
            const args = transactionsQueryValidation.parse(variables.args)

            const transactions = await orm.transaction.findMany({
                orderBy: {
                    date: 'desc',
                },
                select: {
                    ...transactionSelect,
                     category: {
                         select: {
                             ...categorySelect,
                             keywords: {
                                 select: {
                                     ...keywordSelect,
                                 }
                             }

                         }
                     },
                },
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

            const rates = await orm
                .rate
                .findMany()
                .then((response) => {
                    const values = new Map<string, number>()

                    response.forEach((rate) => {
                        values.set(rate.code, rate.value)
                    })

                    return values
                })

             // TODO: i don't like this
             return transactions.map((transaction) => {
                const transactionRate = rates.get(transaction.currency)

                if (!transactionRate) {
                    throw new Error(`Transaction has invalid code: ${JSON.stringify(transaction)}`)
                }

                if (!context.user) {
                    throw new Error("No current user when converting currencies")
                }

                const targetRate = rates.get(context.user?.currency ?? '')

                if (!targetRate) {
                    throw new Error(`Couldn\'t find target rate while converting currency`)
                }

                const baseValue = transaction.amount.toNumber() / transactionRate

                const convertedValue = baseValue * targetRate

                 return {
                     amount: {
                         converted: convertedValue,
                         original: transaction.amount.toNumber(),
                     },
                     reference: transaction.reference,
                     status: transaction.status,
                     description: transaction.description,
                     category: transaction.category,
                     date: transaction.date.toString(),
                     currency: transaction.currency,
                 }
             })
        },
    },
}

export default TransactionResolver
