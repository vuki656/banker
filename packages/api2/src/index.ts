import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'

dotenv.config()

import { registerSyncRatesCron } from './crons'
import {
    context,
    server,
} from './server'
import env from './shared/env'
import { logger } from './shared/logger'

void startStandaloneServer(
    server,
    {
        context,
        listen: {
            port: env.APP_PORT,
        },
    }
)
    .then((info) => {
        logger.info(`🚀 Server started on: ${info.url}`)

        registerSyncRatesCron()
    })
    .catch((error: unknown) => {
        logger.info({
            error,
            message: '💥 Server crashed when starting',
        })
    })
