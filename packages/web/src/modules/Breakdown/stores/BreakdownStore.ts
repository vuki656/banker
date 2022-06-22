import currency from 'currency.js'
import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import type { RangeSelectValue } from '../../../components'
import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'
import { TransactionStatusEnum } from '../../../graphql/types.generated'
import { formatDate } from '../../../utils'

import type { PieChartData, SummaryData } from './BreakdownStore.types'

export class BreakdownStore {
    public transactionsValue: TransactionType[] = []

    public categories: CategoryType[] = []

    public range: RangeSelectValue = {
        endDate: dayjs().toDate(), 
        startDate: dayjs()
            .startOf('month')
            .toDate(),
    }

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public setRange(range: RangeSelectValue) {
        this.range = range
    }

    public setCategories(categories: CategoryType[]) {
        this.categories = categories
    }

    public setTransactions(transactions: TransactionType[]) {
        this.transactionsValue = transactions
    }

    public get transactions() {
        return this.transactionsValue.filter((transaction) => {
            return transaction.status === TransactionStatusEnum.Done
        })
    }

    public get total() {
        return this.transactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)
    }

    public get summaryData() {
        const categories = this.categories.map<SummaryData>((category) => {
            return {
                ...category,
                total: 0,
            }
        })

        return this.transactions.reduce<SummaryData[]>((accumulator, transaction) => {
            return accumulator.map((category) => {
                if (category.id === transaction.category?.id) {
                    return {
                        ...category,
                        total: currency(transaction.amount.converted)
                            .add(category.total)
                            .value,
                    }
                }

                return category
            })
        }, categories)
    }

    public get barChartData() {
        const dates: Date[] = []

        let currentDate = dayjs(this.range.startDate)

        while (currentDate.isBefore(this.range.endDate) || currentDate.isSame(this.range.endDate)) {
            currentDate = currentDate.add(1, 'day')

            dates.push(currentDate.toDate())
        }

        return []
    }

    public get pieChartData() {
        const categories = this.categories.map<PieChartData>((category) => {
            return {
                ...category,
                total: 0,
            }
        })

        return this.transactions.reduce<PieChartData[]>((accumulator, transaction) => {
            return accumulator.map((category) => {
                if (category.id === transaction.category?.id) {
                    return {
                        ...category,
                        total: currency(transaction.amount.converted)
                            .add(category.total)
                            .value,
                    }
                }

                return category
            })
        }, categories)
    }
}
