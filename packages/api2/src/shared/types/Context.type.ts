import type { ContextUser } from '../../server'
import type { logger } from '../logger'

export type Context = {
    logger: typeof logger
    user: ContextUser
}
