import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { verify } from 'jsonwebtoken'
import { User } from '../resolvers/graphql-types.generated'

import env from '../shared/env'
import { logger } from '../shared/logger'
import type { Context } from '../shared/types'

import { cookieValidation } from './context.validation'

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
    } catch(error) {

    }

    return {
        logger,
        user,
    }
}
