/* eslint-disable @typescript-eslint/require-await -- Apollo plugin definition requires every step to be async */

import type { ApolloServerPlugin } from '@apollo/server'
import { v4 } from 'uuid'

import { logger } from '../../shared/logger'
import type { Context } from '../../shared/types'

export const ApolloPluginLogger: ApolloServerPlugin<Context> = {
    async requestDidStart(requestContext) {
        // Don't log constant apollo playground pinging query
        if (requestContext.request.operationName === 'IntrospectionQuery') {
            return
        }

        const loggerInstance = logger.child({ requestId: v4() })

        // Set the global logger instance so it's available throughout requests
        requestContext.contextValue.logger = loggerInstance

        loggerInstance.info({
            message: 'Request started',
            operationName: requestContext.request.operationName,
            query: requestContext.request.query,
            user: requestContext.contextValue.user,
            variables: requestContext.request.variables,
        })

        return {
            async didEncounterErrors(errorContext) {
                for (const error of errorContext.errors) {
                    loggerInstance.error({
                        error,
                        user: requestContext.contextValue.user,
                    })
                }
            },
            async willSendResponse(responseContext) {
                loggerInstance.info({
                    message: 'Sending response',
                    response: responseContext.response,
                    user: requestContext.contextValue.user,
                })
            },
        }
    },
}
