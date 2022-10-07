import type { z } from 'zod'

import type { TransactionType } from '../../../shared/types'

import type { transactionUpdateValidation } from './TransactionUpdateDialog.validation'

export type TransactionUpdateFormValue = z.infer<typeof transactionUpdateValidation>

export type TransactionUpdateDialogProps = {
    isOpen: boolean
    onCancel(): void
    onSubmit(): void
    value: TransactionType
}
