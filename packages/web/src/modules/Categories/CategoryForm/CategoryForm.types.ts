import type { z } from 'zod'

import type { categoryValidation } from './CategoryForm.validation'

export type CategoryFormType = z.infer<typeof categoryValidation>

export type CategoryFormProps = {
    loading: {
        delete?: boolean
        update?: boolean
    }
    onCancel(): void
    onDelete?(): Promise<void>
    onUpdate(formValue: CategoryFormType): Promise<void>
    value?: CategoryFormType
}
