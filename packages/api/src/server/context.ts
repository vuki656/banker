import type { ExpressContext } from 'apollo-server-express'
import { verify } from 'jsonwebtoken'
import { v4 as UUID } from 'uuid'

import { env } from '../shared/env'
import type {
    ContextType,
    TokenDataType,
} from '../shared/typescript-types'

const decodeToken = (authorization: string): TokenDataType | null => {
    const SECRET = env.APP_JWT_SECRET

    const [, token] = authorization.split(' ')

    if (!token) {
        return null
    }

    let tokenData = null

    verify(token, SECRET, function(error, decodedToken) {
        if (error) {
            return
        }

        tokenData = decodedToken
    })

    return tokenData
}

export const context = (expressContext: ExpressContext): ContextType => {
    let token = expressContext.req.headers.authorization

    const tokenData = decodeToken(token ?? '')

    return {
        ...expressContext,
        request: expressContext.req,
        requestId: UUID(),
        response: expressContext.res,
        user: tokenData?.user ?? null,
    }
}
