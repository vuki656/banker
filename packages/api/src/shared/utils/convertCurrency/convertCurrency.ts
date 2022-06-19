import type { ConvertCurrencyInput } from './convertCurrency.types'

class Currency {
    public base: string

    public rates: Record<string, number> = {
        CAD: 1.37,
        EUR: 1,
        HRK: 7.52,
        USD: 1.05,
    }

    constructor(base: string) {
        this.base = base
    }

    public convert(input: ConvertCurrencyInput) {
        const currencyRate = this.rates[input.from]

        if (!currencyRate) {
            throw new Error('Couldn\'t find currency rate while converting currency')
        }

        const targetRate = this.rates[input.to]

        if (!targetRate) {
            throw new Error('Couldn\'t find target rate while converting currency')
        }

        const baseValue = input.amount / currencyRate

        return baseValue * targetRate
    }
}

export const currency = new Currency('EUR')
