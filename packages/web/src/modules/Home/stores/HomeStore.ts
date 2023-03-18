import dayjs from 'dayjs'

import type { HomePageData } from '../../../pages/home'
import type {
    CategoryType,
    TransactionType,
} from '../../../shared/types'

import type { CategoryTotal, DateRange } from './HomeStore.types'

export class HomeStore {
    public dateRange: DateRange = {
        end: dayjs()
            .startOf('day')
            .toDate(),
        start: dayjs()
            .subtract(1, 'month')
            .startOf('month')
            .toDate()
    }

    public categories: CategoryType[] = []

    public transactions: TransactionType[] = []

    constructor(data: HomePageData) {
        this.categories = data.categories
    }

    public setTransactions(transactions: TransactionType[]) {
        this.transactions = transactions
    }

    private splitTransactions() {
        console.log(this.transactionsArgs)

        const focusedMonthTransactions = this.transactions.filter((transaction) => {
            return dayjs(transaction.date).isAfter(dayjs(this.dateRange.end).startOf('month'))
        })

        console.log('focusedMonthTransactions: ', focusedMonthTransactions)

        const previousMonthTransactions = this.transactions.filter((transaction) => {
            return dayjs(transaction.date).isBefore(dayjs(this.dateRange.end).startOf('month'))
        })

        console.log('previousMonthTransactions: ', previousMonthTransactions)

        return {
            focusedMonthTransactions,
            previousMonthTransactions
        }
    }

    public get categoriesTotal() {
        this.splitTransactions()

        const categories = new Map<string, CategoryTotal>()

        this.categories.forEach((category) => {
            categories.set(category.name, {
                color: category.color,
                icon: category.icon,
                total: 0,
            })
        })

        this.transactions.forEach((transaction) => {
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
        return this.transactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)
    }

    public get difference() {
        const currentMonthTotal = this.currentMonthTotal

        if (currentMonthTotal === 0) {
            return 0
        }

        const previousMonthTotal = 0
        // const previousMonthTotal = this.previousMonthTransactions.reduce((accumulator, transaction) => {
        //     return accumulator + transaction.amount.converted
        // }, 0)

        const difference = 100 * Math.abs(
            (currentMonthTotal - previousMonthTotal) /
            ((currentMonthTotal + previousMonthTotal) / 2)
        )

        if (currentMonthTotal < previousMonthTotal) {
            return Math.abs(difference) * -1
        }

        return difference
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
                    x: dayjs(day).format('DD'),
                    y: amount,
                }
            })

        return [{
            data,
            id: 'data',
        }]
    }
}
