import { join } from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'

const resolverFiles = loadFilesSync(
    join(
        __dirname,
        '../resolvers/**/*.resolver.ts'
    ),
    { recursive: true }
)

export const resolvers = mergeResolvers(resolverFiles)
