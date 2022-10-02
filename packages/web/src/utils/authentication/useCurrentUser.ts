import { useContext } from 'react'

import { CurrentUserContext } from './CurrentUserContext'
import type { CurrentUserContextValue } from './CurrentUserContext.types'

export function useCurrentUser(): CurrentUserContextValue {
    return useContext(CurrentUserContext)
}
