import type { TransactionType } from '../../../shared/types'

export type CategoryTotal = {
    color?: string
    icon?: string
    total: number
}

export type DateRange = {
    end: Date
    start: Date
}

export type SplitTransactions = {
    comparisonMonth: TransactionType[]
    focusedMonth: TransactionType[]
}
