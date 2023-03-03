import { join } from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import UserResolver from '../resolvers/user/user.resolver'

// TODO: this isn't loading resolvers correctly. Check the docs, also, generate resolver type seems wrong
const resolverFiles = loadFilesSync(
    join(
        __dirname,
        '../resolvers/**/*.resolver.ts'
    ),
    { recursive: true }
)

console.log(resolverFiles)

export const resolvers = mergeResolvers([UserResolver])
