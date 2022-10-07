import currency from 'currency.js'

import type { FormatCurrencyArgs } from './formatCurrency.types'

export const formatCurrency = (amount: number, args?: FormatCurrencyArgs): string => {
    const formattedAmount = currency(amount, { precision: args?.precision ?? 2 })
        .format({ symbol: '' })
        .toString()

    return `${formattedAmount} ${args?.currency}`
}
