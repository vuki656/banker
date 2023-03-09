import { GraphQLError } from 'graphql'

import type { Context } from '../types'

export const checkAuth = (context: Context) => {
    if (!context.user.value) {
        throw new GraphQLError('Forbidden')
    }
}
