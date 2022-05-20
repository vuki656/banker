import type { z } from 'zod'

import type { loginFormValidationSchema } from './Login.validation'

export type LoginFormValueType = z.infer<typeof loginFormValidationSchema>
