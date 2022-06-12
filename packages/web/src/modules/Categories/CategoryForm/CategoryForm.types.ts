import type { ReactElement } from 'react'
import type { z } from 'zod'

import type { categoryValidation } from './CategoryForm.validation'

export type CategoryFormValueType = z.infer<typeof categoryValidation>

export type CategoryFormProps = {
    formId: string
    loading: boolean
    onSubmit(formValue: CategoryFormValueType): Promise<void>
    submitButton: ReactElement
    value?: CategoryFormValueType
}
