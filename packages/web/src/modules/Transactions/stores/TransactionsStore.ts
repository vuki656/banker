import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import type { RangeSelectValue } from '../../../components'
import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'
import { TransactionStatusEnum } from '../../../graphql/types.generated'

export class TransactionsStore {
    public categories: CategoryType[] = []

    public categoryFilter: string | null = null

    public range: RangeSelectValue = {
        endDate: dayjs().toDate(),
        startDate: dayjs()
            .startOf('month')
            .toDate(),
    }

    public statusFilter = TransactionStatusEnum.Done

    public transactionsValue: TransactionType[] = []

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

    public setCategories(categories: CategoryType[]) {
        this.categories = categories
    }

    public setCategoryFilter(categoryId: string | null) {
        this.categoryFilter = categoryId
    }

    public setRange(newRange: RangeSelectValue) {
        this.range = newRange
    }

    public setStatusFilter(newStatus: TransactionStatusEnum) {
        this.statusFilter = newStatus
    }

    public setTransactions(transactions: TransactionType[]) {
        this.transactionsValue = transactions
    }
}
