import { useApolloClient } from '@apollo/client'
import { removeCookies } from 'cookies-next'
import router from 'next/router'
import {
    createContext,
    useState,
} from 'react'

import type { UserType } from '../../graphql/types.generated'
import { useGetCurrentUserQuery } from '../../graphql/types.generated'
import { COOKIE_TOKEN_NAME } from '../constants'

import type {
    CurrentUserContextProps,
    CurrentUserContextValue,
} from './CurrentUserContext.types'

export const CurrentUserContext = createContext<CurrentUserContextValue | null>(null)

export const CurrentUserProvider: React.FunctionComponent<CurrentUserContextProps> = (props) => {
    const { children } = props

    const apolloClient = useApolloClient()

    const [currentUser, setCurrentUser] = useState<UserType | null>(null)

    useGetCurrentUserQuery({
        fetchPolicy: 'network-only',
        onCompleted: async (response) => {
            if (!response.currentUser) {
                await router.push('/')

                await apolloClient.clearStore()

                setCurrentUser(null)

                removeCookies(COOKIE_TOKEN_NAME)

                return
            }

            setCurrentUser(response.currentUser)
        },
    })

    const load = (user: UserType) => {
        setCurrentUser(user)
    }

    const unload = () => {
        setCurrentUser(null)
    }

    return (
        <CurrentUserContext.Provider
            value={{
                load,
                unload,
                user: currentUser,
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}
