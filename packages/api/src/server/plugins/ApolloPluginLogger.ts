/**
 *  Apollo has a weird definition for the `PluginDefinition` type which requires
 *  all callbacks to be async even if they don't have any async actions
 */

/* eslint-disable @typescript-eslint/require-await */

import { ApolloError } from 'apollo-server'
import type { ApolloServerPlugin } from 'apollo-server-plugin-base'

import { LoggerCategoriesEnum } from '../../shared/enums'
import type { ContextType } from '../../shared/typescript-types'
import { logger } from '../../shared/utils'

export const ApolloPluginLogger: ApolloServerPlugin<ContextType> = {
    async requestDidStart(requestContext) {
        const operationName = requestContext.request.operationName

        // Don't log when using playground or current user
        if (
            operationName === 'IntrospectionQuery' ||
            operationName === 'CurrentUser'
        ) {
            return
        }

        // Don't log when users are queried on login
        if (operationName === 'Users' && !requestContext.context.user) {
            return
        }

        const user = {
            email: requestContext.context.user?.email,
            firstName: requestContext.context.user?.firstName,
            id: requestContext.context.user?.id,
            lastName: requestContext.context.user?.lastName,
        }

        logger.info({
            category: LoggerCategoriesEnum.GRAPHQL_REQUEST,
            context: {
                requestId: requestContext.context.requestId,
                user,
            },
            request: requestContext.request,
        })

        return {
            async didEncounterErrors(errorContext) {
                for (const error of errorContext.errors) {
                    /**
                     *  Only report internal server errors.
                     *  All errors extending ApolloError should be user-facing
                     *
                     */
                    if (error instanceof ApolloError) {
                        continue
                    }

                    logger.error({
                        category: LoggerCategoriesEnum.GRAPHQL_REQUEST,
                        context: {
                            requestId: requestContext.context.requestId,
                            user,
                        },
                        error: errorContext.errors,
                    })
                }
            },
            async willSendResponse(responseContext) {
                logger.info({
                    category: LoggerCategoriesEnum.GRAPHQL_RESPONSE,
                    context: {
                        requestId: requestContext.context.requestId,
                        user,
                    },
                    response: responseContext.response,
                })
            },
        }
    },
}
