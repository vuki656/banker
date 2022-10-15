import { hiveApollo } from '@graphql-hive/client'

import { env } from '../../shared/env'

export const ApolloPluginHive = hiveApollo({
    enabled: env.isProduction,
    token: env.HIVE_TOKEN,
    usage: true,
})
