import type { GraphQLErrorOptions } from 'graphql'
import { GraphQLError } from 'graphql'

export class ForbiddenError extends GraphQLError {
    constructor(
        message = 'Forbidden',
        options?: GraphQLErrorOptions
    ) {
        super(message, {
            ...options,
            extensions: {
                code: 'FORBIDDEN',
                ...options?.extensions,
            },
        })
    }
}
