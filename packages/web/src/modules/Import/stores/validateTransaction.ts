import { showNotification } from '@mantine/notifications'

import type { NewTransactionType } from './ImportStore.types'

export const validateTransaction = (rawTransaction: (number | object | string)[]): NewTransactionType => {
    const date = rawTransaction[0] as Date
    const reference = rawTransaction[1]
    const description = rawTransaction[2]
    const amount = rawTransaction[4]
    const currency = rawTransaction[6]

    if (typeof currency !== 'string') {
        showNotification({
            autoClose: 2000,
            color: 'red',
            message: 'Currency not a string',
            title: 'Error',
        })

        throw new TypeError('Currency not a string')
    }

    if (currency.length !== 3) {
        showNotification({
            autoClose: 2000,
            color: 'red',
            message: 'Currency in invalid format. Not 3 characters.',
            title: 'Error',
        })

        throw new TypeError('Currency in invalid format. Not 3 characters.')
    }

    if (typeof date !== 'object') {
        showNotification({
            autoClose: 2000,
            color: 'red',
            message: 'Date not a string',
            title: 'Error',
        })

        throw new TypeError('Date not a string')
    }

    if (typeof reference !== 'string') {
        showNotification({
            autoClose: 2000,
            color: 'red',
            message: 'Reference not a string',
            title: 'Error',
        })

        throw new TypeError('Reference not a string')
    }

    if (typeof description !== 'string') {
        showNotification({
            autoClose: 2000,
            color: 'red',
            message: 'Description not a string',
            title: 'Error',
        })

        throw new TypeError('Description not a string')
    }

    if (typeof amount !== 'number') {
        showNotification({
            autoClose: 2000,
            color: 'red',
            message: 'Amount not a number',
            title: 'Error',
        })

        throw new TypeError('Amount not a number')
    }

    return {
        amount,
        category: null,
        currency,
        date,
        description,
        reference,
    }
}
