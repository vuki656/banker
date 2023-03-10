import dayjs from 'dayjs'

import {
    authenticatedContext,
    executeOperation,
    wipeDatabase,
} from '../../../shared/test-utils'
import {
    CategoryFactory,
    RateFactory,
    TransactionFactory,
    UserFactory,
} from '../../../shared/test-utils/factories'
import type {
    TransactionsQuery,
    TransactionsQueryVariables,
} from '../../../shared/types/test-types.generated'
import { iterateDateRange } from '../../../shared/utils'

import { TRANSACTIONS } from './graphql'

describe('Category resolver', () => {
    beforeEach(async () => {
        await wipeDatabase()
        await RateFactory.createAll()
    })

    describe('when `transactions` query is called', () => {
        it('should return transactions in date range', async () => {
            const TRANSACTION_COUNT = 45

            const existingUser = await UserFactory.create()

            const endDate = new Date()
            const startDate = dayjs()
                .subtract(TRANSACTION_COUNT, 'days')
                .toDate()

            // In date range transactions
            await iterateDateRange({
                callback: async (date) => {
                    await TransactionFactory.create({
                        currency: 'USD',
                        date,
                        user: {
                            connect: {
                                id: existingUser.id,
                            },
                        },
                    })
                },
                endDate,
                startDate,
            })

            // Out of date range transactions
            await iterateDateRange({
                callback: async (date) => {
                    await TransactionFactory.create({
                        date,
                        user: {
                            connect: {
                                id: existingUser.id,
                            },
                        },
                    })
                },
                endDate: dayjs()
                    .subtract(60, 'days')
                    .toDate(),
                startDate: dayjs()
                    .subtract(100, 'days')
                    .toDate(),
            })

            const response = await executeOperation<
                TransactionsQuery,
                TransactionsQueryVariables
            >({
                query: TRANSACTIONS,
                variables: {
                    args: {
                        endDate: endDate.toISOString(),
                        startDate: startDate.toISOString(),
                    },
                },
            }, authenticatedContext(existingUser))

            expect(response.body?.singleResult.errors).toBeUndefined()
            expect(response.body?.singleResult.data?.transactions).toHaveLength(TRANSACTION_COUNT)
        })

        it('should return only logged in users transactions', async () => {
            const loggedInUser = await UserFactory.create()
            const otherUser = await UserFactory.create()

            await TransactionFactory.create({
                user: {
                    connect: {
                        id: loggedInUser.id,
                    },
                },
            })

            await TransactionFactory.create({
                user: {
                    connect: {
                        id: otherUser.id,
                    },
                },
            })

            const response = await executeOperation<
                TransactionsQuery,
                TransactionsQueryVariables
            >(
                { query: TRANSACTIONS },
                authenticatedContext(loggedInUser)
            )

            expect(response.body?.singleResult.errors).toBeUndefined()
            expect(response.body?.singleResult.data?.transactions).toHaveLength(1)
        })

        it('should return only transactions for a given category', async () => {
            const TRANSACTION_COUNT = 10

            const existingUser = await UserFactory.create()
            const existingCategory = await CategoryFactory.create()

            await TransactionFactory.createMany(TRANSACTION_COUNT, {
                category: {
                    connect: {
                        id: existingCategory.id,
                    },
                },
                user: {
                    connect: {
                        id: existingUser.id,
                    },
                },
            })

            await TransactionFactory.createMany(5, {
                user: {
                    connect: {
                        id: existingUser.id,
                    },
                },
            })

            const response = await executeOperation<
                TransactionsQuery,
                TransactionsQueryVariables
            >({
                query: TRANSACTIONS,
                variables: {
                    args: {
                        categoryId: existingCategory.id,
                    },
                },
            }, authenticatedContext(existingUser))

            expect(response.body?.singleResult.errors).toBeUndefined()
            expect(response.body?.singleResult.data?.transactions).toHaveLength(TRANSACTION_COUNT)
        })
    })
})
