import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { verify } from 'jsonwebtoken'

import type { User } from '../../../resolvers/graphql-types.generated'
import env from '../../../shared/env'
import { logger } from '../../../shared/logger'
import type { Context } from '../../../shared/types'

import { cookieValidation } from './context.validation'
import { ContextUser } from './ContextUser'

// eslint-disable-next-line @typescript-eslint/require-await -- Apollo context has to be async
export const context = async ({ req }: StandaloneServerContextFunctionArgument): Promise<Context> => {
    const [, token] = req.headers.authorization?.split(' ') ?? []

    let user: User | null = null

    try {
        const tokenData = verify(token ?? '', env.APP_JWT_SECRET)

        const { user: parsedUser } = cookieValidation.parse(tokenData)

        user = parsedUser
    } catch (error: unknown) {
        logger.trace({
            error,
            message: 'Error while parsing auth header',
        })
    }

    return {
        logger,
        user: new ContextUser(user),
    }
}
