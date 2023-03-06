import { orm } from '../../shared/orm'

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

export const convertTransaction = async <TTransaction extends BaseTransaction>(
    transaction: TTransaction,
    userCurrency: string,
    rates: Map<string, number>
) => {
    const transactionRate = rates.get(transaction.currency)

    if (!transactionRate) {
        throw new Error(`Transaction has invalid code: ${JSON.stringify(transaction)}`)
    }

    const targetRate = rates.get(userCurrency ?? '')

    if (!targetRate) {
        throw new Error('Couldn\'t find target rate while converting currency')
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
