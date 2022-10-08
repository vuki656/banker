import dayjs from 'dayjs'

import type { HomePageData } from '../../../pages/home'
import type {
    CategoryType,
    TransactionType,
} from '../../../shared/types'

import type { CategoryTotal } from './HomeStore.types'

export class HomeStore {
    public categories: CategoryType[] = []

    public currentMonthTransactions: TransactionType[] = []

    public previousMonthTransactions: TransactionType[] = []

    constructor(data: HomePageData) {
        this.currentMonthTransactions = data.currentMonthTransactions
        this.previousMonthTransactions = data.previousMonthTransactions
        this.categories = data.categories
    }

    public get categoriesTotal() {
        const categories = new Map<string, CategoryTotal>()

        this.categories.forEach((category) => {
            categories.set(category.name, {
                color: category.color,
                icon: category.icon,
                total: 0,
            })
        })

        this.currentMonthTransactions.forEach((transaction) => {
            const name = transaction.category?.name ?? 'Other'
            const category = categories.get(name)

            categories.set(name, {
                ...category,
                total: (category?.total ?? 0) + transaction.amount.converted,
            })
        })

        return Array.from(categories).sort(([, firstElement], [, secondElement]) => {
            if (firstElement.total > secondElement.total) {
                return -1
            }

            if (firstElement.total < secondElement.total) {
                return 1
            }

            return 0
        })
    }

    public get currentMonthTotal() {
        return this.currentMonthTransactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)
    }

    public get difference() {
        const currentMonthTotal = this.currentMonthTotal

        if (currentMonthTotal === 0) {
            return 0
        }

        const previousMonthTotal = this.previousMonthTransactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)

        const difference = 100 * Math.abs((currentMonthTotal - previousMonthTotal) / ((currentMonthTotal + previousMonthTotal) / 2))

        if (currentMonthTotal < previousMonthTotal) {
            return Math.abs(difference) * -1
        }

        return difference
    }

    public get expensesPerDay() {
        const expensesPerDay = this.currentMonthTransactions.reduce((accumulator, transaction) => {
            const dayAmount = accumulator.get(transaction.date) ?? 0

            if (dayAmount) {
                return accumulator.set(transaction.date, dayAmount + transaction.amount.converted)
            } else {
                return accumulator.set(transaction.date, transaction.amount.converted)
            }
        }, new Map<string, number>())

        const max = Array.from(expensesPerDay).reduce((accumulator, [, amount]) => {
            if (amount > accumulator) {
                return amount
            }

            return accumulator
        }, 0)

        const yAxisScale = [...new Array(Math.round(max / 1000))].map((_, index) => {
            return (index + 1) * 1000
        })

        return {
            list: [{
                data: Array.from(expensesPerDay).reverse()
                    .map(([day, amount]) => {
                        return {
                            x: dayjs(day).format('DD'),
                            y: amount,
                        }
                    }),
                id: 'data',
            }],
            yAxisScale: yAxisScale.unshift(0),
        }
    }
}
