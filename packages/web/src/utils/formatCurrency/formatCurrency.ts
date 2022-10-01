export const formatCurrency = (amount: number, userCurrency?: string): string => {
    return new Intl
        .NumberFormat(
            'eu-EU',
            { currency: userCurrency, style: 'currency' }
        )
        .format(amount)
}
