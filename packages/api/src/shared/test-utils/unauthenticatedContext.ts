import type { ExecuteOperationOptions } from '@apollo/server/dist/esm/externalTypes/graphql'

import { ContextUser } from '../../server'
import { logger } from '../logger'
import type { Context } from '../types'

export const unauthenticatedContext: ExecuteOperationOptions<Context> = {
    contextValue: {
        logger,
        user: new ContextUser(null),
    },
}
