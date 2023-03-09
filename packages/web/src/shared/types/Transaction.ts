import type { TransactionStatus } from '../../graphql/types.generated'

import type { AmountType } from './Amount'
import type { CategoryType } from './Category'

export type TransactionType = {
    amount: AmountType
    category: Omit<CategoryType, 'keywords'> | null
    currency: string
    date: string
    description: string
    id: string
    reference: string
    status: TransactionStatus
}
