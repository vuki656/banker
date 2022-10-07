import type { FieldError } from 'react-hook-form'

import type { ExtractFormFieldErrorValue } from './extractFormFieldError.types'

export function extractFormFieldErrors(fieldError: FieldError | undefined): ExtractFormFieldErrorValue {
    if (!fieldError?.message) {
        return {
            error: '',
        }
    }

    return {
        error: fieldError.message,
    }
}
