import { join } from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typesDefinitionFiles = loadFilesSync(
    join(
        __dirname,
        '../../resolvers/**/graphql/**/*.gql'
    ),
    { recursive: true }
)

export const typeDefs = mergeTypeDefs(typesDefinitionFiles)
