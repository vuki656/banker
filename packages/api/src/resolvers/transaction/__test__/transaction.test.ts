import dayjs from 'dayjs'

import {
    authenticatedContext,
    executeOperation,
    wipeDatabase,
} from '../../../shared/test-utils'
import {
    TransactionFactory,
    UserFactory,
} from '../../../shared/test-utils/factories'
import { RateFactory } from '../../../shared/test-utils/factories'
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
        it('should return transactions', async () => {
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
    })
})
