import type { ApolloPageContext } from 'next-with-apollo'

import type { UserType } from '../../shared/types'

export interface CurrentUserPageContext extends ApolloPageContext {
    user: UserType | null
}

export type CurrentUserContextValue = {
    /**
     * Function used for creating GraphQL request
     * for currently logged in user and updating user context
     *
     * @default ""
     */
    load(): Promise<void>
    /**
     * Function used for clearing currently logged in user
     * from user context
     *
     * @default ""
     */
    unload(): void
    /**
     * Currently logged in user
     *
     * @default "null"
     */
    user: UserType | null
}

export type AccessRightType = {
    id: string
    name: string
}
