import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import { logger } from '../../shared/logger'
import type { Context } from '../../shared/types'
import { httpServer } from '../express'

import {
    ApolloPluginLandingPage,
    ApolloPluginLogger,
} from './plugins'
import { resolvers } from './resolvers'
import { typeDefs } from './type-defs'

export const apolloServer = new ApolloServer<Context>({
    logger,
    plugins: [
        ApolloPluginLandingPage,
        ApolloPluginLogger,
        ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    resolvers,
    typeDefs,
})
