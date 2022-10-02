import { createContext } from 'react'
import type { CurrentUserContextValue } from './CurrentUserContext.types'

export const CurrentUserContext = createContext<CurrentUserContextValue>({
    // eslint-disable-next-line @typescript-eslint/require-await
    async load() {
        return undefined
    },
    unload() {
        return undefined
    },

    user: null,
})
