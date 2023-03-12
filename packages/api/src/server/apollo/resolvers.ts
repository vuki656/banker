import { mergeResolvers } from '@graphql-tools/merge'

import CategoryResolver from '../../resolvers/category/category.resolver'
import TransactionResolver from '../../resolvers/transaction/transaction.resolver'
import UserResolver from '../../resolvers/user/user.resolver'

// eslint-ignore-next-line etc/no-commented-out-code
// const resolverFiles = loadFilesSync(
//     join(
//         __dirname,
//         '../resolvers/**/*.resolver.ts'
//     ),
//     { recursive: true }
// )

// @ts-expect-error
export const resolvers = mergeResolvers([
    UserResolver,
    CategoryResolver,
    TransactionResolver,
])
