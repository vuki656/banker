import currency from 'currency.js'
import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import type { RangeSelectValue } from '../../../components'
import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'
import { TransactionStatusEnum } from '../../../graphql/types.generated'
import {
    createDateRange,
    formatDate,
} from '../../../utils'

import type {
    BarChartDataType,
    PieChartDataType,
    SummaryDataType,
} from './BreakdownStore.types'

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

    public setRange(range: RangeSelectValue): void {
        this.range = range
    }

    public setCategories(categories: CategoryType[]): void {
        this.categories = categories
    }

    public setTransactions(transactions: TransactionType[]): void {
        this.transactionsValue = transactions
    }

    public get transactions(): TransactionType[] {
        return this.transactionsValue.filter((transaction) => {
            return transaction.status === TransactionStatusEnum.Done
        })
    }

    public get total(): number {
        return this.transactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount.converted
        }, 0)
    }

    public get summaryData(): SummaryDataType[] {
        const categories = this.categories.map<SummaryDataType>((category) => {
            return {
                ...category,
                total: 0,
            }
        })

        return this.transactions.reduce<SummaryDataType[]>((accumulator, transaction) => {
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
        const dates = createDateRange(this.range.startDate, this.range.endDate)

        return dates.reduce<BarChartDataType[]>((dateAccumulator, date) => {
            const dateTransactions = this.transactions.filter((transaction) => {
                return dayjs(transaction.date).isSame(date)
            })

            const categorizedDateTransactions = dateTransactions.reduce<Record<string, number>>(
                (transactionAccumulator, transaction) => {
                    const categoryName = transaction.category?.name

                    if (!categoryName) {
                        return transactionAccumulator
                    }

                    const currentCategorySum = transactionAccumulator[categoryName] ?? 0

                    return {
                        ...transactionAccumulator,
                        [categoryName]: currency(currentCategorySum)
                            .add(transaction.amount.converted)
                            .value,
                    }
                },
                {}
            )

            return [
                ...dateAccumulator,
                {
                    ...categorizedDateTransactions,
                    date: formatDate(date),
                },
            ]
        }, [])
    }

    public get pieChartData(): PieChartDataType[] {
        const categories = this.categories.map<PieChartDataType>((category) => {
            return {
                ...category,
                total: 0,
            }
        })

        return this.transactions.reduce<PieChartDataType[]>((accumulator, transaction) => {
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
