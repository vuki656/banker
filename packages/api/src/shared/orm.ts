import { PrismaClient } from '@prisma/client'

import { logger } from './logger'

export const orm = new PrismaClient({
    errorFormat: 'colorless',
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
    ],
})

orm.$on('query', (event) => {
    logger.trace(event)
})

orm.$on('info', (event) => {
    logger.info(event)
})

orm.$on('warn', (event) => {
    logger.warn(event)
})

orm.$on('error', (event) => {
    logger.error(event)
})
