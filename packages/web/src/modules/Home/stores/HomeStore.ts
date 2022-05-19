import { showNotification } from '@mantine/notifications'
import { makeAutoObservable } from 'mobx'

import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'

import type { NewTransactionType } from './HomeStore.types'

export class HomeStore {
    public categories: CategoryType[] = []

    public newTransactions: NewTransactionType[] = []

    public existingTransactions: TransactionType[] = []

    public currentTransaction: NewTransactionType | null = null

    constructor(
        transactions: TransactionType[],
        categories: CategoryType[]
    ) {
        this.categories = categories
        this.existingTransactions = transactions

        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public setCurrentTransaction() {
        if (this.newTransactions.length > 0) {
            const nextTransaction = this.newTransactions[0]
            let matchedKeyword = ''

            if (!nextTransaction) {
                throw new Error('Transactions exist but couldn\'t get the next one')
            }

            const matchedCategory = this.categories.find((category) => {
                const foundKeyword = category.keywords.find((keyword) => {
                    return nextTransaction
                        .description
                        .includes(keyword.name)
                })

                if (foundKeyword) {
                    matchedKeyword = foundKeyword.name
                }

                return Boolean(foundKeyword)
            }) ?? null

            this.currentTransaction = {
                ...nextTransaction,
                category: matchedCategory,
                keyword: matchedKeyword,
            }

            this.newTransactions.shift()
        } else {
            this.currentTransaction = null
        }
    }

    public updateCurrentTransactionCategory(category: CategoryType) {
        if (this.currentTransaction) {
            this.currentTransaction.category = category
        }
    }

    public discardTransaction() {
        this.newTransactions.shift()

        this.setCurrentTransaction()
    }

    public parseTransactions(excelRows: Record<string, number | object | string>[]): void {
        // Remove the first two rows as they are not transactions
        excelRows.splice(0, 2)

        const fileTransactions = excelRows.map((excelRow) => {
            const rawTransaction = Object.values(excelRow)

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

            const transaction: NewTransactionType = {
                amount,
                category: null,
                currency,
                date,
                description,
                reference,
            }

            return transaction
        })

        this.newTransactions = fileTransactions.filter((fileTransaction) => {
            return !this.existingTransactions.some((existingTransaction) => {
                return existingTransaction.reference === fileTransaction.reference
            })
        })

        if (this.newTransactions.length === 0) {
            showNotification({
                color: 'blue',
                message: 'Info',
                title: 'All transactions already entered',
            })

            return
        }

        this.setCurrentTransaction()
    }
}
