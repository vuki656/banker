import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import type { RangeSelectValue } from '../../../components'
import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'
import { TransactionStatusEnum } from '../../../graphql/types.generated'

export class TransactionsStore {
    public statusFilter = TransactionStatusEnum.Done

    public categoryFilter: string | null = null

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

    public get transactions() {
        return this.transactionsValue.filter((transaction) => {
            if (this.categoryFilter) {
                return transaction.status === this.statusFilter && this.categoryFilter === transaction.category?.id
            }

            return transaction.status === this.statusFilter
        })
    }

    public setRange(newRange: RangeSelectValue) {
        this.range = newRange
    }

    public setTransactions(transactions: TransactionType[]) {
        this.transactionsValue = transactions
    }

    public setStatusFilter(newStatus: TransactionStatusEnum) {
        this.statusFilter = newStatus
    }

    public setCategories(categories: CategoryType[]) {
        this.categories = categories
    }

    public setCategoryFilter(categoryId: string | null) {
        this.categoryFilter = categoryId
    }
}
