import dayjs from 'dayjs'
import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import { nullableConnect } from '../../shared/utils/nullableConnect'

import type { TransactionsArgs } from './args'
import type {
    CreateTransactionInput,
    UpdateTransactionInput,
} from './inputs'
import type {
    CreateTransactionPayload,
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

        return {
            transaction: createdTransaction,
        }
    }

    public async updateOne(input: UpdateTransactionInput): Promise<UpdateTransactionPayload> {
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

        return {
            transaction: updatedTransaction,
        }
    }

    public async findAll(args?: TransactionsArgs | null, userId?: string): Promise<TransactionType[]> {
        const startDate = args?.startDate ?? dayjs()
            .subtract(30, 'year')
            .toDate()

        const endDate = args?.endDate ?? dayjs().toDate()

        return orm.transaction.findMany({
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
    }
}
