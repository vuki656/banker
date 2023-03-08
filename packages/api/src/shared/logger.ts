import pino from 'pino'

import env from './env'

export const logger = pino({
    enabled: !env.isTest,
    level: env.APP_LOG_LEVEL,
    redact: ["variables.input.password"]
})
