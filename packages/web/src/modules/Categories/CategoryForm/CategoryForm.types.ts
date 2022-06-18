import type { z } from 'zod'

import type { categoryValidation } from './CategoryForm.validation'

export type CategoryFormValueType = z.infer<typeof categoryValidation>

export type CategoryFormProps = {
    loading: boolean
    onSubmit(formValue: CategoryFormValueType): Promise<void>
    value?: CategoryFormValueType
}
