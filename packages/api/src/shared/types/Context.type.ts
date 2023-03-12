import type { ContextUser } from '../../server/apollo'
import type { logger } from '../logger'

export type Context = {
    logger: typeof logger
    user: ContextUser
}
