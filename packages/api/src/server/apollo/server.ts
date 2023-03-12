import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server'
import { logger } from '../../shared/logger'
import { Context } from '../../shared/types'


import {
    ApolloPluginLandingPage,
    ApolloPluginLogger,
} from './plugins'
import { resolvers } from './resolvers'
import { typeDefs } from './type-defs'
import { httpServer } from '../express'

export const apolloServer = new ApolloServer<Context>({
    logger,
    plugins: [
        ApolloPluginLandingPage,
        ApolloPluginLogger,
        ApolloServerPluginDrainHttpServer({ httpServer })
    ],
    resolvers,
    typeDefs,
})
