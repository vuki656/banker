import type { z } from 'zod'

import type { categoryValidation } from './CategoryForm.validation'

export type CategoryFormType = z.infer<typeof categoryValidation>

export type CategoryFormProps = {
    onCancel(): void
    onDelete?(): void
    onUpdate(formValue: CategoryFormType): void
    value?: CategoryFormType
}
