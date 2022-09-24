import { showNotification } from '@mantine/notifications'
import { makeAutoObservable } from 'mobx'

import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'

import type { NewTransactionType } from './ImportStore.types'

export class ImportStore {
    public categories: CategoryType[] = []

    public newTransactions: NewTransactionType[] = []

    public newTransactionsAmount = 0

    public existingTransactions: TransactionType[] = []

    public currentTransaction: NewTransactionType | null = null

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public setExistingTransactions(transactions: TransactionType[]): void {
        this.existingTransactions = transactions
    }

    public setCategories(categories: CategoryType[]): void {
        this.categories = categories
    }

    public get progress(): string | null {
        if (this.newTransactions.length === 0) {
            return null
        }

        return `${this.newTransactionsAmount - this.newTransactions.length} / ${this.newTransactionsAmount}`
    }

    public setCurrentTransaction(): void {
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
                        .toLowerCase()
                        .includes(keyword.name.toLowerCase())
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

            return
        }

        this.currentTransaction = null
    }

    public updateCurrentTransactionCategory(category: CategoryType): void {
        if (this.currentTransaction) {
            this.currentTransaction.category = category
        }
    }

    public discardTransaction(): void {
        this.newTransactions.shift()

        this.setCurrentTransaction()
    }

    public parseTransactions(excelRows: Record<string, number | object | string>[]): void {
        // Remove the first two rows as they are not transactions
        excelRows.splice(0, 2)

        const fileTransactions = excelRows.reduce<NewTransactionType[]>((accumulator, excelRow) => {
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

            return [
                ...accumulator,
                transaction,
            ]
        }, [])

        // Remove existing transactions and cancellations
        let transactions = fileTransactions.reduceRight<NewTransactionType[]>((accumulator, fileTransaction) => {
            const isEntered = this.existingTransactions.some((existingTransaction) => {
                return existingTransaction.reference === fileTransaction.reference
            })

            if (isEntered) {
                return accumulator
            }

            const cancelationTransaction = accumulator.find((transaction) => {
                return transaction.description.toLowerCase().includes(fileTransaction.reference.toLowerCase())
            })

            if (cancelationTransaction) {
                return accumulator.filter((transaction) => {
                    return transaction.reference !== cancelationTransaction.reference
                })
            }

            return [
                ...accumulator,
                fileTransaction,
            ]
        }, [])

        // Remove transactions that aren't negative
        transactions = transactions.filter((transaction) => {
            return transaction.amount > 0
        })

        this.newTransactions = transactions
        this.newTransactionsAmount = transactions.length

        if (transactions.length === 0) {
            showNotification({
                color: 'blue',
                message: 'Info',
                title: 'All transactions already entered',
            })

            return
        }

        this.setCurrentTransaction()
    }

    public updateTransactionAmount(newAmount: number): void {
        if (this.currentTransaction) {
            this.currentTransaction.amount = newAmount
        }
    }
}
