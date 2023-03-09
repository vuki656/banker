import type { HTTPGraphQLHead } from '@apollo/server'
import type { GraphQLResponseBody } from '@apollo/server/dist/esm/externalTypes/graphql'

import type { server } from '../../../server'

export type RequestType = Parameters<typeof server.executeOperation>[0]
export type OptionsType = Parameters<typeof server.executeOperation>[1]

export type ResponseDataType = Record<string, unknown>

type BaseResponse = {
    http: HTTPGraphQLHead
}

export type SingleResponseReturnType<TData = ResponseDataType> = BaseResponse & {
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
