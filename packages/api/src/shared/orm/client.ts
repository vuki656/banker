import { PrismaClient } from '@prisma/client'

import { LoggerCategoriesEnum } from '../enums'
import { logger } from '../utils'

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
    logger.trace({
        ...event,
        type: 'DATABASE',
    })
})

orm.$on('info', (event) => {
    logger.trace({
        ...event,
        category: LoggerCategoriesEnum.DATABASE,
    })
})

orm.$on('warn', (event) => {
    logger.trace({
        ...event,
        category: LoggerCategoriesEnum.DATABASE,
    })
})

orm.$on('error', (event) => {
    logger.trace({
        ...event,
        category: LoggerCategoriesEnum.DATABASE,
    })
})

orm.$use(async (parameters, next) => {
    // Override native `delete` and soft delete instead
    if (parameters.action === 'delete') {
        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transforming `delete` action to `update`',
        })

        parameters.action = 'update'

        parameters.args = {
            ...parameters.args,
            data: {
                isDeleted: true,
                ...parameters.args?.data,
            },
        }

        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transformed `delete`',
        })
    }

    // Override native `findUnique` and only get not soft deleted entities
    if (parameters.action === 'findUnique') {
        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transforming `findUnique` action to `findFirst`',
        })

        parameters.action = 'findFirst'

        parameters.args = {
            ...parameters.args,
            where: {
                isDeleted: false,
                ...parameters.args?.where,
            },
        }

        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transformed `findUnique`',
        })
    }

    // Override native `findMany` and add
    //  - Default sorting by `id`
    //  - Get only non soft deleted entities
    if (parameters.action === 'findMany') {
        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transforming `findMany` and adding `isDeleted: false` and `orderBy: { id: "asc" }`',
        })

        parameters.args = {
            ...parameters.args,
            // `orderBy` can only have one property set
            orderBy: parameters.args?.orderBy ?? {
                id: 'asc',
            },
            where: {
                isDeleted: false,
                ...parameters.args?.where,
            },
        }

        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transformed `findMany`',
        })
    }

    // Override native `count` and only count non soft deleted entities
    if (parameters.action === 'count') {
        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transforming `count` and adding `isDeleted: false`',
        })

        parameters.args = {
            ...parameters.args,
            where: {
                isDeleted: false,
                ...parameters.args?.where,
            },
        }

        logger.trace({
            category: LoggerCategoriesEnum.DATABASE,
            data: parameters,
            message: 'Transformed `count`',
        })
    }

    return next(parameters)
})
