import type { GraphQLSchema } from 'graphql'
import type {
    BuildSchemaOptions,
    NonEmptyArray,
} from 'type-graphql'
import { buildSchemaSync } from 'type-graphql'

import * as resolvers from '../resolvers'

import { authChecker } from './authChecker'

export const generateSchema = (options?: Pick<BuildSchemaOptions, 'authChecker'>): GraphQLSchema => {
    return buildSchemaSync({
        ...options,
        authChecker,
        resolvers: [...Object.values(resolvers)] as unknown as NonEmptyArray<string>,
        validate: false,
    })
}
