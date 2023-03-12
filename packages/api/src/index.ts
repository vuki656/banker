import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser'
import cors from 'cors'
import type {
    Request,
    Response,
} from 'express'

import { registerSyncRatesCron } from './crons'
import { apolloServer } from './server/apollo'
import {
    expressApp,
    httpServer,
} from './server/express'
import env from './shared/env'
import { logger } from './shared/logger'

const startApolloServer = async () => {
    await apolloServer
        .start()
        .then(() => {
            logger.info('Apollo server started successfully')
        })
        .catch((error: unknown) => {
            logger.error({
                error,
                message: 'Apollo server failed to start',
            })
        })
}

const startExpressServer = async () => {
    // FIXME: typing is likely their fuck up as it expects a base context and doesn't allow custom context
    const middleware = expressMiddleware(apolloServer as any)

    expressApp.use(
        '/graphql',
        cors(),
        bodyParser.json({ limit: '50mb' }),
        middleware
    )

    // expressApp.use((error: any, _: Request, response: Response) => {
    //     logger.error({
    //         error,
    //         message: 'Error fulfilling express request',
    //     })
    //
    //     response.status(500).end()
    // })

    await new Promise<void>((resolve) => {
        httpServer.listen({ port: env.APP_PORT }, resolve)
    })
        .then(() => {
            logger.info('Express server started successfully')
        })
        .catch((error: unknown) => {
            logger.error({
                error,
                message: 'Express server failed to start',
            })
        })
}

const startCrons = () => {
    registerSyncRatesCron()
}

const startServers = async () => {
    await startApolloServer()
    await startExpressServer()

    startCrons()
}

void startServers()
