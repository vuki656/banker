import type { ExpressContext } from 'apollo-server-express'

import type { UserType } from '../../resolvers'

export type ContextType = {
    request: ExpressContext['req']
    requestId: string
    response: ExpressContext['res']
    user: UserType | null
}
