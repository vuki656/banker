import { makeAutoObservable } from 'mobx'

import type { TransactionType } from './HomeStore.types'

export class HomeStore {
    public transactions: TransactionType[] = []

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public parseTransactions(excelRows: Record<string, number | object | string>[]) {
        // Remove the first two rows that are not transactions
        excelRows.splice(0, 2)

        this.transactions = excelRows.map((excelRow) => {
            const rawTransaction = Object.values(excelRow)

            const date = rawTransaction[0] as Date
            const id = rawTransaction[1]
            const description = rawTransaction[2]
            const amount = rawTransaction[4]

            if (typeof date !== 'object') {
                throw new TypeError('Date not a string')
            }

            if (typeof id !== 'string') {
                throw new TypeError('ID not a string')
            }

            if (typeof description !== 'string') {
                throw new TypeError('Description not a string')
            }

            if (typeof amount !== 'number') {
                throw new TypeError('Amount not a number')
            }

            const transaction: TransactionType = {
                amount,
                date,
                description,
                id,
            }

            return transaction
        })
    }
}
