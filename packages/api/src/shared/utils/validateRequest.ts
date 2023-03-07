import type { Context } from '../types'

export const validateRequest = (context: Context) => {
    if (!context.user.value) {
        throw new Error('Forbidden')
    }
}
