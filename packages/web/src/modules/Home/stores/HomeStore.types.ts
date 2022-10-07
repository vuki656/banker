import type { TransactionStatusEnum } from '../../../graphql/types.generated'

export type CategoryTotal = {
    color?: string
    icon?: string
    total: number
}

export type TransactionType = {
    amount: {
        converted: number
        original: number
    }
    category: {
        color: string
        icon: string
        id: string
        name: string
    } | null
    currency: string
    date: string
    description: string
    id: string
    reference: string
    status: TransactionStatusEnum
}
