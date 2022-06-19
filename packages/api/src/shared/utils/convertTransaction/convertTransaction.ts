import { orm } from '../../orm'
import { currency } from '../convertCurrency'

export const convertTransaction = async <TTransaction extends Record<string, any>>(transaction: TTransaction, userId?: string) => {
    const user = await orm.user.findUnique({
        select: {
            currency: true,
        },
        where: {
            id: userId,
        },
    })

    if (!user?.currency) {
        throw new Error('User has no currency set')
    }

    const convertedAmount = currency.convert(
        {
            amount: transaction.amount,
            from: transaction.currency,
            to: user.currency,
        }
    )

    return {
        ...transaction,
        amount: {
            converted: convertedAmount,
            original: transaction.amount,
        },
    }
}
