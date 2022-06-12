import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import type { RangeSelectValue } from '../../../components'
import type { TransactionType } from '../../../graphql/types.generated'
import { TransactionStatusEnum } from '../../../graphql/types.generated'

export class TransactionsStore {
    public status = TransactionStatusEnum.Done

    public transactionsValue: TransactionType[] = []

    public range: RangeSelectValue = {
        endDate: dayjs().toDate(),
        // eslint-disable-next-line newline-per-chained-call
        startDate: dayjs().startOf('month').toDate(),
    }

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public get transactions() {
        return this.transactionsValue.filter((transaction) => {
            return transaction.status === this.status
        })
    }

    public setRange(newRange: RangeSelectValue) {
        this.range = newRange
    }

    public setTransactions(transactions: TransactionType[]) {
        this.transactionsValue = transactions
    }

    public setStatus(newStatus: TransactionStatusEnum) {
        this.status = newStatus
    }
}
