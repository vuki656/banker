import type { z } from 'zod'

import type { createCategoryFormValidation } from './CategoryCreateDialog.validation'

export type CreateCategoryFormType = z.infer<typeof createCategoryFormValidation>

export type CategoryCreateDialogProps = {
    onSubmit(): void
}
