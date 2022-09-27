import { CategoryType } from "../../../graphql/types.generated"

export type NewTransactionType = {
    amount: number
    currency: string
    date: Date
    description: string
    reference: string
    category: CategoryType | null
}

export type MatchedCategoryType = {
    category: CategoryType | null
    keyword: string
}
