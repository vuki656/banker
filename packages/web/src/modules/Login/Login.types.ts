import type { z } from 'zod'

import type { loginFormValidationSchema } from './Login.validation'

export type LoginFormValuesType = z.infer<typeof loginFormValidationSchema>
