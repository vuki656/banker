import { makeAutoObservable } from 'mobx'

import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'

import type { BreakdownCardData } from './BreakdownStore.types'

export class BreakdownStore {
    public transactions: TransactionType[] = []

    public categories: CategoryType[] = []

    constructor(
        categories: CategoryType[],
        transactions: TransactionType[]
    ) {
        this.transactions = transactions
        this.categories = categories

        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public get summaryData() {
        const categories = this.categories.reduce<BreakdownCardData>((accumulator, category) => {
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
                    amount: category.amount + transaction.amount,
                },
            }
        }, categories)
    }

    public get pieChartData() {
        // eslint-disable-next-line max-len
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
                    amount: category.amount + transaction.amount,
                },
            }
        }, categories)
    }
}
