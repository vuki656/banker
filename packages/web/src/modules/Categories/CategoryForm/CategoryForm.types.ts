import type { ReactNode } from 'react'
import type { z } from 'zod'

import type { categoryFormValidation } from './CategoryForm.validation'

export type CategoryFormValueType = z.infer<typeof categoryFormValidation>

export type CategoryFormProps = {
    formId: string
    onSubmit(formValue: CategoryFormValueType): void
    submitButton: ReactNode
    value?: CategoryFormValueType
}
