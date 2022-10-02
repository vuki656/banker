import { useContext } from 'react'

import { HomeStoreContext } from '../../../pages/home'
import type { HomeStore } from '../stores'

export function useHomeStore(): HomeStore {
    const context = useContext(HomeStoreContext)

    if (!context) {
        throw new Error('Missing HomeStoreContext.Provider')
    }

    return context
}
