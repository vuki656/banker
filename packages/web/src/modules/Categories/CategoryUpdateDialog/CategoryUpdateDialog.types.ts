import type { CategoryType } from '../../../graphql/types.generated'

export type CategoryUpdateDialogProps = {
    isOpen: boolean
    onCancel(): void
    onSubmit(): void
    value: CategoryType
}
