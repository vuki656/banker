import dayjs from 'dayjs'
import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import {
    convertTransaction,
    nullableConnect,
} from '../../shared/utils'

import type { TransactionsArgs } from './args'
import { TransactionStatusEnum } from './enums'
import type {
    CreateTransactionInput,
    DiscardTransactionInput,
    UpdateTransactionInput,
} from './inputs'
import type {
    CreateTransactionPayload,
    DiscardTransactionPayload,
    UpdateTransactionPayload,
} from './payloads'
import { TRANSACTION_DEFAULT_SELECT } from './Transaction.select'
import type { TransactionType } from './types'

@singleton()
export class TransactionService {
    public async createOne(input: CreateTransactionInput, userId?: string): Promise<CreateTransactionPayload> {
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
                        id: userId,
                    },
                },
            },
            select: TRANSACTION_DEFAULT_SELECT(),
        })

        const convertedTransaction = await convertTransaction(createdTransaction, userId)

        return {
            transaction: convertedTransaction,
        }
    }

    public async updateOne(input: UpdateTransactionInput, userId?: string): Promise<UpdateTransactionPayload> {
        const updatedTransaction = await orm.transaction.update({
            data: {
                amount: input.amount,
                category: input.categoryId ? {
                    connect: {
                        id: input.categoryId,
                    },
                } : {
                    disconnect: true,
                },
                currency: input.currency,
                date: input.date,
                description: input.description,
            },
            select: TRANSACTION_DEFAULT_SELECT(),
            where: {
                id: input.id,
            },
        })

        const convertedTransaction = await convertTransaction(updatedTransaction, userId)

        return {
            transaction: convertedTransaction,
        }
    }

    public async discardOne(input: DiscardTransactionInput, userId?: string): Promise<DiscardTransactionPayload> {
        const discardedTransaction = await orm.transaction.update({
            data: {
                status: TransactionStatusEnum.DISCARDED,
            },
            select: TRANSACTION_DEFAULT_SELECT(),
            where: {
                id: input.id,
            },
        })

        const convertedTransaction = await convertTransaction(discardedTransaction, userId)

        return {
            transaction: convertedTransaction,
        }
    }

    public async findAll(args?: TransactionsArgs | null, userId?: string): Promise<TransactionType[]> {
        const startDate = args?.startDate ?? dayjs()
            .subtract(30, 'year')
            .toDate()

        const endDate = args?.endDate ?? dayjs().toDate()

        const transactions = await orm.transaction.findMany({
            orderBy: {
                date: 'desc',
            },
            select: TRANSACTION_DEFAULT_SELECT(),
            where: {
                AND: [
                    {
                        date: {
                            gte: startDate,
                        },
                    },
                    {
                        date: {
                            lte: endDate,
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
    }
}
