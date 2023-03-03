import type { User } from '../../resolvers/graphql-types.generated'
import { logger } from "../logger"

export type Context = {
    logger: typeof logger
    user: User | null
}
