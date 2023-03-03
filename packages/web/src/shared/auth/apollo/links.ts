import {
    ApolloClient,
    ApolloLink,
    from,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import isomorphicFetch from 'isomorphic-fetch'
import type { InitApolloOptions } from 'next-with-apollo'
import getConfig from 'next/config'

import introspectionGeneratedTS from '../../../graphql/introspection.generated.json'
import introspectionGeneratedJSON from '../../../graphql/types.generated'
import { COOKIE_TOKEN_NAME } from '../../constants'
import { createUnAuthRedirect } from '../authentication/utils/auth'
import { CookieManager } from '../cookies'

export const initApolloClient = (options: InitApolloOptions<any>) => {
    let apolloClient: ApolloClient<any>

    const typesPolicies = introspectionGeneratedTS
        .__schema
        .types
        .filter((type) => {
            return type.kind === 'OBJECT'
        })
        .map((type) => {
            return [type.name, { merge: true }]
        })

    const httpLink = new HttpLink({
        fetch: isomorphicFetch,
        uri: getConfig().publicRuntimeConfig.API_URL,
    })

    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext((context: any) => ({
            headers: {
                ...context.headers,
                Authorization: `Bearer ${CookieManager.getCookie(
                    typeof window === 'undefined' ? options.ctx : context, COOKIE_TOKEN_NAME,
                )}`,
            },
        }))

        return forward(operation)
    })

    const errorLink = onError((errorHandler) => {
        const {
            graphQLErrors,
            networkError,
        } = errorHandler

        if (graphQLErrors) {
            console.error('[GraphQLError] GraphQL error occurred: ', JSON.stringify(graphQLErrors))

            const isAuthenticationError = graphQLErrors.some((graphQLError) => {
                return graphQLError.extensions.code === 'AUTHENTICATION_ERROR'
            })

            if (isAuthenticationError) {
                void createUnAuthRedirect(options.ctx)
            }
        }

        if (networkError) {
            console.error('[NetworkError] Network error occurred: ', JSON.stringify(networkError))
        }
    })

    apolloClient = new ApolloClient({
        cache: new InMemoryCache({
            possibleTypes: introspectionGeneratedJSON.possibleTypes,
            typePolicies: Object.fromEntries(typesPolicies),
        }).restore(options.initialState ?? {}),
        link: from([errorLink, authLink, httpLink]),
        name: '@banker/web',
        ssrMode: typeof window === 'undefined',
    })

    return apolloClient
}
