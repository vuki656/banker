import { hiveApollo } from '@graphql-hive/client'

import { env } from '../../shared/env'

export const ApolloPluginHive = hiveApollo({
    enabled: true,
    token: env.HIVE_TOKEN,
    usage: true,
})
