import type { HTTPGraphQLHead } from '@apollo/server'
import type { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql'

import { server } from '../../../server'

import type {
    ExecuteOperationReturnType,
    IncrementalResponseReturnType,
    OptionsType,
    RequestType,
    ResponseDataType,
    SingleResponseReturnType,
} from './executeOperation.types'

// TODO: doc
export const executeOperation = async <
    TData extends ResponseDataType,
    TVariables extends VariableValues = VariableValues,
    ExpectedType extends 'incremental' | 'single' = 'single'
>(
    request: RequestType,
    options: OptionsType,
    expectedTypeProp?: ExpectedType
): Promise<ExecuteOperationReturnType<ExpectedType, TData>> => { // FIXME: any
    const expectedType = expectedTypeProp ?? 'single'

    const response = await server.executeOperation<TData, TVariables>(request as any, options)

    if (response.body.kind !== expectedType) {
        throw new Error(`Got ${response.body.kind} as a response type. Expected ${expectedType}`)
    }

    if (expectedType === 'single') {
        return {
            http: response.http,
            body: response.body,
        } as SingleResponseReturnType<TData>
    }

    if (expectedType === 'incremental') {
        return {
            body: response.body,
            http: response.http,
        } as IncrementalResponseReturnType
    }

    throw new Error('Unexpected end of execute operation')
}
