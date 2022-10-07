import type { CategoryType } from '../../../shared/types'

export type CategoryUpdateDialogProps = {
    isOpen: boolean
    onCancel(): void
    onSubmit(): void
    value: CategoryType
}
