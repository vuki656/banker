import type { ReactElement } from 'react'
import type { z } from 'zod'

import type { categoryFormValidation } from './CategoryForm.validation'

export type CategoryFormValueType = z.infer<typeof categoryFormValidation>

export type CategoryFormProps = {
    formId: string
    loading: boolean
    onSubmit(formValue: CategoryFormValueType): Promise<void>
    submitButton: ReactElement
    value?: CategoryFormValueType
}
