import type { CategoryType } from '../../../graphql/types.generated'

export type NewTransactionType = {
    amount: number
    category: CategoryType | null
    currency: string
    date: Date
    description: string
    keyword: string | null
    reference: string
}
