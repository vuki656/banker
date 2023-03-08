import { GraphQLError } from 'graphql'

import type { Context } from '../types'

export const validateRequest = (context: Context) => {
    if (!context.user.value) {
        throw new GraphQLError('Forbidden')
    }
}
