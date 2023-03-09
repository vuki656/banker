import type { GraphQLErrorOptions } from 'graphql'
import { GraphQLError } from 'graphql'

export class UnexpectedError extends GraphQLError {
    constructor(
        message = 'Unexpected error',
        options?: GraphQLErrorOptions
    ) {
        super(message, {
            ...options,
            extensions: {
                code: 'UNEXPECTED',
                ...options?.extensions,
            },
        })
    }
}
