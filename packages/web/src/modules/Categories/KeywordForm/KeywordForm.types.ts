import type { z } from 'zod'

import type { keywordValidation } from './KeywordForm.validation'

export type KeywordFormValueType = z.infer<typeof keywordValidation>

export type KeywordFormProps = {
    onCancel(): void
    onSubmit(formValue: KeywordFormValueType): void
}
