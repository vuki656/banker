import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { v4 } from 'uuid'

import {
    authenticatedContext,
    executeOperation,
    unauthenticatedContext,
    wipeDatabase,
} from '../../../shared/test-utils'
import {
    CategoryFactory,
    RateFactory,
    TransactionFactory,
    UserFactory,
} from '../../../shared/test-utils/factories'
import type {
    CreateTransactionInput,
    CreateTransactionMutation,
    CreateTransactionMutationVariables,
    TransactionsQuery,
    TransactionsQueryVariables,
    UpdateTransactionMutation,
    UpdateTransactionMutationVariables,
} from '../../../shared/types/test-types.generated'
import { TransactionStatus } from '../../../shared/types/test-types.generated'
import { iterateDateRange } from '../../../shared/utils'

import {
    CREATE_TRANSACTION,
    TRANSACTIONS,
    UPDATE_TRANSACTION,
} from './graphql'

describe('Category resolver', () => {
    beforeEach(async () => {
        await wipeDatabase()
    })

    describe('when `transactions` query is called', () => {
        // TODO: this is flaky, sometimes 1 more
        it('should return transactions in date range', async () => {
            await RateFactory.createAll()

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
            await RateFactory.createAll()

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
            await RateFactory.createAll()

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

        it('should return an error if not authenticated', async () => {
            const response = await executeOperation<
                TransactionsQuery,
                TransactionsQueryVariables
            >(
                { query: TRANSACTIONS },
                unauthenticatedContext
            )

            expect(response.body?.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when `createTransaction` mutation is called', () => {
        it('should create transaction', async () => {
            await RateFactory.createAll()

            const existingUser = await UserFactory.create()

            const input: CreateTransactionInput = {
                amount: faker.datatype.number(),
                currency: 'USD',
                date: new Date().toISOString(),
                description: faker.lorem.sentence(),
                reference: v4(),
                status: TransactionStatus.Done,
            }

            const response = await executeOperation<
                CreateTransactionMutation,
                CreateTransactionMutationVariables
            >({
                query: CREATE_TRANSACTION,
                variables: {
                    input,
                },
            }, authenticatedContext(existingUser))

            expect(response.body?.singleResult.errors).toBeUndefined()
            expect(response.body?.singleResult.data?.createTransaction.transaction).toMatchObject({
                ...input,
                amount: {
                    converted: input.amount,
                    original: input.amount,
                },
                date: expect.any(String),
            })
        })

        it('should return an error if not authenticated', async () => {
            const response = await executeOperation<
                CreateTransactionMutation,
                CreateTransactionMutationVariables
            >({
                query: CREATE_TRANSACTION,
                variables: {
                    input: {
                        amount: faker.datatype.number(),
                        currency: 'USD',
                        date: new Date().toISOString(),
                        description: faker.lorem.sentence(),
                        reference: v4(),
                        status: TransactionStatus.Done,
                    },
                },
            }, unauthenticatedContext)

            expect(response.body?.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when `updateTransaction` mutation is called', () => {
        it('should return an error if not authenticated', async () => {
            const response = await executeOperation<
                UpdateTransactionMutation,
                UpdateTransactionMutationVariables
            >({
                query: UPDATE_TRANSACTION,
                variables: {
                    input: {
                        amount: faker.datatype.number(),
                        currency: 'USD',
                        date: new Date().toISOString(),
                        description: faker.lorem.sentence(),
                        id: faker.datatype.uuid(),
                        status: TransactionStatus.Done,
                    },
                },
            }, unauthenticatedContext)

            expect(response.body?.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })
})
