import {
    createContext,
    useState,
} from 'react'

import type { UserType } from '../../graphql/types.generated'
import { useGetCurrentUserQuery } from '../../graphql/types.generated'

import type {
    CurrentUserContextProps,
    CurrentUserContextValue,
} from './CurrentUserContext.types'

export const CurrentUserContext = createContext<CurrentUserContextValue | null>(null)

export const CurrentUserProvider: React.FunctionComponent<CurrentUserContextProps> = (props) => {
    const { children } = props

    const [currentUser, setCurrentUser] = useState<UserType | null>(null)

    useGetCurrentUserQuery({
        fetchPolicy: 'network-only',
        onCompleted: (response) => {
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
