import type { TransactionType } from '../../../shared/types'

export type TransactionProps = {
    onClick(): void
    transaction: TransactionType
}
