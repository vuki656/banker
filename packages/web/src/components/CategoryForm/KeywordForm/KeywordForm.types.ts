import type { z } from 'zod'

import type { KeywordType } from '../../../shared/types'

import type { keywordValidation } from './KeywordForm.validation'

export type KeywordFormProps = {
    onCancel(): void
    onSubmit(name: KeywordType): void
    value?: KeywordFormType
}

export type KeywordFormType = z.infer<typeof keywordValidation>
