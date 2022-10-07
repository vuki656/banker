import type { CategoryType } from '../../../shared/types'

export type NewTransactionType = {
    amount: number
    category: CategoryType | null
    currency: string
    date: Date
    description: string
    reference: string
}

export type MatchedCategoryType = {
    category: CategoryType | null
    keyword: string
}
