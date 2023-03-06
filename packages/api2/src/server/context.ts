import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { verify } from 'jsonwebtoken'

import type { User } from '../resolvers/graphql-types.generated'
import env from '../shared/env'
import { logger } from '../shared/logger'
import type { Context } from '../shared/types'

import { cookieValidation } from './context.validation'

// TODO: maybe add a fn here that will check if it exists and throw if doesn't. this would be
// useful for getting user when he should exist, so you don't have to check in 100 places if you need it in 100 places
// eslint-disable-next-line @typescript-eslint/require-await -- Apollo context has to be async
export const context = async ({ req }: StandaloneServerContextFunctionArgument): Promise<Context> => {
    const [,token] = req.headers.authorization?.split(' ') ?? []

    let user: User | null = null

    // TODO: without try catch this will fail and prevent graphql apollo playground from working
    // TODO: Write this so it's not trash
    try {
        const tokenData = verify(token ?? '', env.APP_JWT_SECRET)

        const { user: parsedUser } = cookieValidation.parse(tokenData)

        user = parsedUser
    } catch {}

    return {
        logger,
        user,
    }
}
