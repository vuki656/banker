import type { ApolloClient } from '@apollo/client'
import type {
    AppInitialProps,
    AppProps,
} from 'next/app'
import NextApp from 'next/app'
import type { AppContext } from 'next/dist/pages/_app'
import React from 'react'

import type {
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
} from '../../../graphql/types.generated'
import { GetCurrentUserDocument } from '../../../graphql/types.generated'
import type { UserType } from '../../types'
import type { ExtraAppProps } from '../apollo'

import { CurrentUserContext } from './CurrentUserContext'
import type {
    CurrentUserContextValue,
    CurrentUserPageContext,
} from './CurrentUserContext.types'
import { isServerExecutionEnvironment } from './utils/environment'
import type { AppComponentType } from './withCurrentUser.types'

type WithCurrentUserProps = AppProps & ExtraAppProps & {
    user: UserType | null
}

type WithCurrentUserGetInitialProps = AppInitialProps & {
    user: UserType | null
}

export const withCurrentUser = (AppComponent: AppComponentType) => {
    return class WithCurrentUser extends NextApp<WithCurrentUserProps, any, CurrentUserContextValue> {
        public static async fetchUser(apolloClient: ApolloClient<unknown>, cache: boolean) {
            try {
                const apolloResult = await apolloClient.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
                    fetchPolicy: cache ? 'cache-only' : 'network-only',
                    query: GetCurrentUserDocument,
                })

                return apolloResult.data.currentUser
            } catch {
                return null
            }
        }

        public static getDerivedStateFromProps(props: WithCurrentUserProps, state: CurrentUserContextValue) {
            return {
                ...state,
                user: props.user,
            }
        }

        public static async getInitialProps(appContext: AppContext): Promise<WithCurrentUserGetInitialProps> {
            const context = appContext.ctx as unknown as CurrentUserPageContext

            let user: UserType | null

            if (isServerExecutionEnvironment()) {
                user = await WithCurrentUser.fetchUser(context.apolloClient, false)
            } else {
                user = await WithCurrentUser.fetchUser(context.apolloClient, true)
            }

            const getInitialProps = AppComponent.getInitialProps

            if (getInitialProps) {
                context.user = user

                const originalProps = await getInitialProps(appContext)

                return {
                    ...originalProps,
                    user,
                }
            }

            return {
                pageProps: null,
                user,
            }
        }

        public load = async () => {
            const user = await WithCurrentUser.fetchUser(this.props.apollo, false)

            this.setState(() => ({ user }))
        }

        public unload = () => {
            this.setState(() => ({ user: null }))
        }

        constructor(props: WithCurrentUserProps) {
            super(props)

            this.state = {
                load: this.load,
                unload: this.unload,
                user: props.user,
            }
        }

        public render() {
            const {
                user,
                ...otherProps
            } = this.props

            return (
                <CurrentUserContext.Provider value={this.state}>
                    <AppComponent {...otherProps} />
                </CurrentUserContext.Provider>
            )
        }
    }
}
