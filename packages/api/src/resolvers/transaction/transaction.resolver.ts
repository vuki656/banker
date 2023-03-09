import dayjs from 'dayjs'

import { orm } from '../../shared/orm'
import {
    checkAuth,
    connectDisconnect,
    nullableConnect,
} from '../../shared/utils'
import {
    categorySelect,
    keywordSelect,
} from '../category'

import type { TransactionModule } from './resolver-types.generated'
import { transactionSelect } from './transaction.select'
import {
    convertTransaction,
    fetchRates,
} from './transaction.utils'
import {
    createTransactionMutationValidation,
    transactionsQueryValidation,
    updateTransactionMutationValidation,
} from './transaction.validation'

const TransactionResolver: TransactionModule.Resolvers = {
    Mutation: {
        createTransaction: async (_, variables, context) => {
            checkAuth(context)

            const input = createTransactionMutationValidation.parse(variables.input)

            const createdTransaction = await orm.transaction.create({
                data: {
                    amount: input.amount,
                    category: nullableConnect(input.categoryId),
                    currency: input.currency,
                    date: input.date,
                    description: input.description,
                    reference: input.reference,
                    status: input.status,
                    user: {
                        connect: {
                            id: context.user.nonNullValue.id,
                        },
                    },
                },
                select: {
                    ...transactionSelect,
                },
            })

            const rates = await fetchRates()

            const convertedTransaction = await convertTransaction(
                createdTransaction,
                context.user.nonNullValue.currency,
                rates
            )

            return {
                transaction: convertedTransaction,
            }
        },
        updateTransaction: async (_, variables, context) => {
            checkAuth(context)

            const input = updateTransactionMutationValidation.parse(variables.input)

            const updatedTransaction = await orm.transaction.update({
                data: {
                    amount: input.amount,
                    category: connectDisconnect(input.categoryId),
                    currency: input.currency,
                    date: input.date,
                    description: input.description,
                    status: input.status,
                },
                select: {
                    ...transactionSelect,
                    category: {
                        select: {
                            ...categorySelect,
                            keywords: {
                                select: keywordSelect,
                            },
                        },
                    },
                },
                where: {
                    id: input.id,
                },
            })

            const rates = await fetchRates()

            const convertedTransaction = await convertTransaction(
                updatedTransaction,
                context.user.nonNullValue.currency,
                rates
            )

            return {
                transaction: convertedTransaction,
            }
        },
    },
    Query: {
        transactions: async (_, variables, context) => {
            checkAuth(context)

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
                                select: keywordSelect,
                            },

                        },
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
                                lte: args.endDate ?? dayjs().toDate(),
                            },
                        },
                        {
                            category: {
                                id: args.categoryId ?? undefined,
                            },
                        },
                    ],
                    user: {
                        id: context.user.nonNullValue.id,
                    },
                },
            })

            const rates = await fetchRates()

            return transactions.map(async (transaction) => {
                return convertTransaction(
                    transaction,
                    context.user.nonNullValue.currency,
                    rates
                )
            })
        },
    },
}

export default TransactionResolver
