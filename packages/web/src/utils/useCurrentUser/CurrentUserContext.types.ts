import type { ReactNode } from 'react'

import type { UserType } from '../../graphql/types.generated'

export type CurrentUserContextValue = {
    load(user: UserType): void
    unload(): void
    user: UserType | null
}

export type CurrentUserContextProps = {
    children: ReactNode
}
