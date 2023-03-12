import { join } from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

export const DEVELOPMENT_SCHEMA_PATH = '../../resolvers/**/*.gql'

const typesDefsArray = loadFilesSync(
    join(
        __dirname,
        DEVELOPMENT_SCHEMA_PATH
    ),
    { recursive: true }
)

export const typeDefs = mergeTypeDefs(typesDefsArray)
