import { logger } from "../logger"

// TODO: use user from prisma??
export type Context = {
    logger: typeof logger
    user: {
        id: string
        firstName: string
        lastName: string
    }
}
