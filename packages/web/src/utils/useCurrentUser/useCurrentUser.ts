import { useContext } from 'react'

import { CurrentUserContext } from './CurrentUserContext'
import type { CurrentUserContextValue } from './CurrentUserContext.types'

export function useCurrentUser(): CurrentUserContextValue {
    const context = useContext(CurrentUserContext)

    if (!context) {
        throw new Error('No user context')
    }

    return context
}
