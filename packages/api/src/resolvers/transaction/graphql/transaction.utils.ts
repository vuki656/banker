import { UnexpectedError } from '../../../shared/errors'
import { orm } from '../../../shared/orm'

import type { BaseTransaction } from './transaction.types'

export const fetchRates = async () => {
    return orm
        .rate
        .findMany()
        .then((response) => {
            const values = new Map<string, number>()

            response.forEach((rate) => {
                values.set(rate.code, rate.value)
            })

            return values
        })
}

export const convertTransactionAmount = <TTransaction extends BaseTransaction>(
    transaction: TTransaction,
    userCurrency: string,
    rates: Map<string, number>
) => {
    const transactionRate = rates.get(transaction.currency)

    if (!transactionRate) {
        throw new UnexpectedError('Transaction has invalid code', {
            extensions: {
                transaction,
            },
        })
    }

    const targetRate = rates.get(userCurrency)

    if (!targetRate) {
        throw new UnexpectedError('Couldn\'t find target rate while converting user currency', {
            extensions: {
                userCurrency,
            },
        })
    }

    const baseValue = transaction.amount.toNumber() / transactionRate

    const convertedValue = baseValue * targetRate

    return {
        ...transaction,
        amount: {
            converted: convertedValue,
            original: transaction.amount.toNumber(),
        },
        date: transaction.date.toString(),
    }
}
