import { logger } from '../shared/logger'
import type { Context } from '../shared/types'

// eslint-disable-next-line @typescript-eslint/require-await -- Apollo context has to be async
export const context = async (): Promise<Context> => {
    return {
        logger,
        user: {
            email: '1',
            firstName: '1',
            id: '1',
            lastName: '1',
        },
    }
}
