import dayjs from 'dayjs'
import {
    makeAutoObservable,
    observable,
} from 'mobx'

import type { RangeSelectValue } from '../../../components'
import type { CategoryPageData } from '../../../pages/categories/[categoryId]'
import type {
    CategoryType,
    TransactionType,
} from '../../../shared/types'

export class CategoryStore {
    public category: CategoryType

    public endDate: Date

    public setRange = (dates: RangeSelectValue) => {
        this.startDate = dates.startDate
        this.endDate = dates.endDate
    }

    public startDate: Date

    public transactions = observable.array<TransactionType>([])

    constructor(data: CategoryPageData) {
        this.transactions.replace(data.transactions)
        this.endDate = data.endDate
        this.startDate = data.startDate
        this.category = data.category

        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public get expensesPerDay() {
        const expensesPerDay = this.transactions.reduce((accumulator, transaction) => {
            const dayAmount = accumulator.get(transaction.date) ?? 0

            if (dayAmount) {
                return accumulator.set(transaction.date, dayAmount + transaction.amount.converted)
            } else {
                return accumulator.set(transaction.date, transaction.amount.converted)
            }
        }, new Map<string, number>())

        const data = Array
            .from(expensesPerDay)
            .reverse()
            .map(([day, amount]) => {
                return {
                    x: dayjs(day).format('DD/MM'),
                    y: amount,
                }
            })

        return [{
            data,
            id: 'data',
        }]
    }

    public get range() {
        return {
            endDate: this.endDate,
            startDate: this.startDate,
        }
    }

    public get total() {
        return this.transactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)
    }

    public setCategory(category: CategoryType) {
        this.category = category
    }

    public setTransactions(transactions: TransactionType[]) {
        this.transactions.replace(transactions)
    }
}
