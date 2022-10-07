import type { TransactionType } from '../../../shared/types'

export type TransactionProps = {
    onClick(): void
    value: TransactionType
}
