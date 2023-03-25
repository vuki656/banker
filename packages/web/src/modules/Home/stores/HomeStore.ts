import dayjs from 'dayjs'

import type { HomePageData } from '../../../pages/home'
import type {
    CategoryType,
    TransactionType,
} from '../../../shared/types'

import type { CategoryTotal, DateRange, SplitTransactions } from './HomeStore.types'

export class HomeStore {
    public dateRange: DateRange = {
        end: dayjs()
            .startOf('day')
            .toDate(),
        start: dayjs()
            .startOf('month')
            .toDate()
    }

    public categories: CategoryType[] = []

    public transactions: SplitTransactions = {
        comparisonMonth: [],
        focusedMonth: []

    }

    constructor(data: HomePageData) {
        this.categories = data.categories
    }

    public setTransactions(transactions: TransactionType[]) {
        const { comparisonMonth, focusedMonth } = transactions.reduce<SplitTransactions>((accumulator, transaction) => {
            const isFocusedMonthDate = dayjs(transaction.date).isAfter(this.dateRange.start)

            if (isFocusedMonthDate) {
                return {
                    ...accumulator,
                    focusedMonth: [
                        ...accumulator.focusedMonth,
                        transaction
                    ]
                }
            }

            return {
                ...accumulator,
                comparisonMonth: [
                    ...accumulator.comparisonMonth,
                    transaction
                ]
            }
        }, { focusedMonth: [], comparisonMonth: [] })

        this.transactions = {
            comparisonMonth,
            focusedMonth,
        }
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

        this.transactions.focusedMonth.forEach((transaction) => {
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

    public get focusedMonthTotal() {
        return this.transactions.focusedMonth.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)
    }

    public get difference() {
        const focusedMonthTotal = this.focusedMonthTotal

        if (focusedMonthTotal === 0) {
            return 0
        }

        const comparisonMonthTotal = this.transactions.comparisonMonth.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)

        const difference = 100 * Math.abs(
            (focusedMonthTotal - comparisonMonthTotal) /
            ((focusedMonthTotal + comparisonMonthTotal) / 2)
        )

        if (focusedMonthTotal < comparisonMonthTotal) {
            return Math.abs(difference) * -1
        }

        return difference
    }

    public get expensesPerDay() {
        const expensesPerDay = this.transactions.focusedMonth.reduce((accumulator, transaction) => {
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
