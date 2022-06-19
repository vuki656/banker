import currency from 'currency.js'

export const formatCurrency = (amount: number, userCurrency?: string) => {
    return `${currency(amount, { precision: 2 }).toString()} ${userCurrency}`
}
