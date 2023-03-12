import type { HTTPGraphQLHead } from '@apollo/server'
import type {
    GraphQLResponseBody,
    VariableValues,
} from '@apollo/server/dist/esm/externalTypes/graphql'

import { apolloServer } from '../../../server/apollo'

type BaseResponse = {
    http: HTTPGraphQLHead
}

export type ResponseDataType = Record<string, unknown>

export type RequestType<
    TData extends ResponseDataType,
    TVariables extends VariableValues
> = Parameters<typeof apolloServer.executeOperation<TData, TVariables>>[0]

export type SingleResponseReturnType<TData extends ResponseDataType> = BaseResponse & {
    body?: Extract<GraphQLResponseBody<TData>, { kind: 'single' }>
}

export type IncrementalResponseReturnType = BaseResponse & {
    body?: Extract<GraphQLResponseBody, { kind: 'incremental' }>
}

export type ExecuteOperationReturnType<
    ExpectedType extends string,
    TData extends ResponseDataType
> = ExpectedType extends 'single'
    ? SingleResponseReturnType<TData>
    : IncrementalResponseReturnType
