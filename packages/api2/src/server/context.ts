import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { verify } from 'jsonwebtoken'

import env from '../shared/env'
import { logger } from '../shared/logger'
import type { Context } from '../shared/types'

import { cookieValidation } from './context.validation'

// eslint-disable-next-line @typescript-eslint/require-await -- Apollo context has to be async
export const context = async ({ req, res }: StandaloneServerContextFunctionArgument): Promise<Context> => {
    // TODO: figure out how to get this from request
    const cookie = '123'

    const tokenData = verify(cookie, env.APP_JWT_SECRET)

    const { user } = cookieValidation.parse(tokenData)

    return {
        logger,
        user,
    }
}
