import {
    cleanEnv,
    num,
    str,
} from 'envalid'
import type { Level } from 'pino'

const env = cleanEnv(process.env, {
    APP_CURRENCY_REFRESH_CRON: str(),
    APP_CURRENCY_REFRESH_TOKEN: str(),
    APP_JWT_DURATION: num(),
    APP_JWT_SECRET: str(),
    APP_LOG_LEVEL: str<Level>({ choices: ['fatal', 'info', 'debug', 'warn', 'error', 'trace'] }),
    APP_PORT: num(),
    DB_PRISMA_URL: str(),
})

export default env
