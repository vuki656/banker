import { useContext } from 'react'

import { BreakdownStoreContext } from '../../../pages/breakdown'
import type { BreakdownStore } from '../stores'

export function useBreakdownStore(): BreakdownStore {
    const context = useContext(BreakdownStoreContext)

    if (!context) {
        throw new Error('Missing BreakdownStoreContext.Provider')
    }

    return context
}
