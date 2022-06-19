import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import type { RangeSelectValue } from '../../../components'
import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'
import { TransactionStatusEnum } from '../../../graphql/types.generated'

import type {
    BreakdownBarChartData,
    BreakdownSummaryCardData,
} from './BreakdownStore.types'

export class BreakdownStore {
    public transactionsValue: TransactionType[] = []

    public categories: CategoryType[] = []

    public range: RangeSelectValue = {
        endDate: dayjs().toDate(), // eslint-disable-next-line newline-per-chained-call
        startDate: dayjs().startOf('month').toDate(),
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
        return this.transactions.reduce((accumulator, value) => {
            return accumulator + value.amount.converted
        }, 0)
    }

    public get summaryData() {
        const categories = this.categories.reduce<BreakdownSummaryCardData>((accumulator, category) => {
            return {
                ...accumulator,
                [category.name]: {
                    ...category,
                    amount: 0,
                },
            }
        }, {})

        return this.transactions.reduce((accumulator, transaction) => {
            const transactionCategory = transaction.category

            if (!transactionCategory) {
                return accumulator
            }

            const category = accumulator[transactionCategory.name]

            if (!category) {
                return accumulator
            }

            return {
                ...accumulator,
                [transactionCategory.name]: {
                    ...transactionCategory,
                    amount: category.amount + transaction.amount.converted,
                },
            }
        }, categories)
    }

    public get barChartData() {
        const dates: dayjs.Dayjs[] = []

        let currentDate = dayjs(this.range.startDate)

        // Create a range of dayjs date objects from range start to range end date
        while (currentDate.isBefore(this.range.endDate) || currentDate.isSame(this.range.endDate)) {
            currentDate = currentDate.add(1, 'day')

            dates.push(currentDate)
        }

        // Group transactions per category, and then for each date in range for that category
        const data = this.categories.reduce<BreakdownBarChartData[]>((categoryAccumulator, category) => {
            return [
                ...categoryAccumulator,
                {
                    backgroundColor: category.color,
                    data: dates.map((date) => {
                        // Sum transactions only for current date and current category
                        return this.transactions.reduce((transactionAmountAccumulator, transaction) => {
                            const isSameDate = dayjs(transaction.date).isSame(date)
                            const isSameCategory = transaction.category?.id === category.id

                            if (isSameDate && isSameCategory) {
                                return transactionAmountAccumulator + transaction.amount.converted
                            }

                            return transactionAmountAccumulator
                        }, 0)
                    }),
                    label: category.name,
                },
            ]
        }, [])

        const formattedDates = dates.map((date) => {
            return dayjs(date).format('DD.MM.YY')
        })

        return {
            data,
            labels: formattedDates,
        }
    }

    public get pieChartData() {
        const categories = this.categories.reduce<Record<string, { amount: number, color: string }>>((accumulator, category) => {
            return {
                ...accumulator,
                [category.name]: {
                    amount: 0,
                    color: category.color,
                },
            }
        }, {})

        return this.transactions.reduce((accumulator, transaction) => {
            if (!transaction.category) {
                return accumulator
            }

            const category = accumulator[transaction.category.name]

            if (!category) {
                return accumulator
            }

            return {
                ...accumulator,
                [transaction.category.name]: {
                    ...category,
                    amount: category.amount + transaction.amount.converted,
                },
            }
        }, categories)
    }
}
