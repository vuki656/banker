import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import { nullableConnect } from '../../shared/utils/nullableConnect'

import type { CreateTransactionInput } from './inputs'
import type { CreateTransactionPayload } from './payloads'
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

    public async findAll(userId?: string): Promise<TransactionType[]> {
        return orm.transaction.findMany({
            select: TRANSACTION_DEFAULT_SELECT(),
            where: {
                isDeleted: false,
                user: {
                    id: userId,
                },
            },
        })
    }
}
