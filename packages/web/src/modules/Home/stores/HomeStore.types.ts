import { TransactionStatusEnum } from "../../../graphql/types.generated"

export type CategoryTotal = {
    color?: string
    icon?: string
    total: number
}

export type TransactionType = {
    amount: {
        original: number
        converted: number
    }
    category: {
        id: string
        name: string
        color: string
        icon: string
    } | null
    currency: string
    date: string
    description: string
    id: string
    reference: string
    status: TransactionStatusEnum
}
