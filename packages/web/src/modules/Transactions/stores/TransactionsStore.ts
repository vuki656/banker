import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import type { RangeSelectValue } from '../../../components'
import { TransactionStatus } from '../../../graphql/types.generated'
import type { TransactionsPageData } from '../../../pages/transactions'
import type {
    CategoryType,
    TransactionType,
} from '../../../shared/types'

export class TransactionsStore {
    public categories: CategoryType[] = []

    public range: RangeSelectValue = {
        endDate: dayjs().toDate(),
        startDate: dayjs()
            .startOf('month')
            .toDate(),
    }

    public statusFilter = TransactionStatus.Done

    private _selectedCategoryId: string | null = null

    private _transactions: TransactionType[] = []

    constructor(data: TransactionsPageData) {
        this.categories.push(...data.categories)

        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public get categorySelectItems() {
        return this.categories.map((category) => {
            return {
                color: category.color,
                icon: category.icon,
                label: category.name,
                value: category.id,
            }
        })
    }

    public get transactions() {
        return this._transactions.filter((transaction) => {
            const statusFilter = transaction.status === this.statusFilter

            if (this._selectedCategoryId) {
                const categoryFilter = transaction.category?.id === this._selectedCategoryId

                return statusFilter && categoryFilter
            }

            return statusFilter
        })
    }

    public setCategoryFilter(categoryId: string | null) {
        this._selectedCategoryId = categoryId
    }

    public setRange(newRange: RangeSelectValue) {
        this.range = newRange
    }

    public setStatusFilter(newStatus: TransactionStatus) {
        this.statusFilter = newStatus
    }

    public setTransactions(transactions: TransactionType[]) {
        this._transactions = transactions
    }
}
