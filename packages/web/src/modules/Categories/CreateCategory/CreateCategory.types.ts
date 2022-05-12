import type { z } from 'zod'

import type { createCategoryFormValidation } from './CreateCategory.validation'

export type CreateCategoryFormValueType = z.infer<typeof createCategoryFormValidation>

export type CreateCategoryProps = {
    onSubmit(): void
}
