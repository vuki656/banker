import {
    cleanEnv,
    num,
    str,
} from 'envalid'
import type { Level } from 'pino'

const env = cleanEnv(process.env, {
    APP_LOG_LEVEL: str<Level>({ choices: ['fatal', 'info', 'debug', 'warn', 'error', 'trace'] }),
    APP_JWT_DURATION: num(),
    APP_JWT_SECRET: str(),
    APP_PORT: num(),
    DB_URL: str(),
})

export default env
