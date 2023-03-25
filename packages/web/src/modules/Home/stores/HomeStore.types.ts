import { TransactionType } from "../../../shared/types"

export type CategoryTotal = {
    color?: string
    icon?: string
    total: number
}

export type DateRange = {
    start: Date
    end: Date
}

export type SplitTransactions = {
    focusedMonth: TransactionType[]
    comparisonMonth: TransactionType[]
}
