import currency from 'currency.js'

export const formatCurrency = (amount: number, userCurrency?: string) => {
    const formattedAmount = currency(amount, { precision: 2 })
        .format({
            decimal: ',',
            separator: '.',
            symbol: '',
        })

    return `${formattedAmount} ${userCurrency}`
}
