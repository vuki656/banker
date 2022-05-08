import { verify } from 'jsonwebtoken'
import type { AuthChecker } from 'type-graphql'

import { env } from '../shared/env'
import type { ContextType } from '../shared/typescript-types'

export const authChecker: AuthChecker<ContextType> = (input): boolean => {
    const authorization = input.context.request.headers.authorization

    if (!authorization) {
        return false
    }

    const [tokenFormat, tokenValue] = authorization.split(' ')

    if (!tokenValue) {
        return false
    }

    if (tokenFormat !== 'Bearer') {
        return false
    }

    const token = verify(tokenValue, env.APP_JWT_SECRET)

    return Boolean(token)
}
