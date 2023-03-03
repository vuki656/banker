import pino from 'pino'

import env from './env'

// TODO: redact login password
export const logger = pino({
    enabled: !env.isTest,
    level: env.APP_LOG_LEVEL,
})
