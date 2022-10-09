import type { CategoryType } from '../../../shared/types'

export type CategoryUpdateDialogProps = {
    onCancel(): void
    onSubmit(): void
    value: CategoryType
}
