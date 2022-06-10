import type { NextPage } from 'next'
import { createContext } from 'react'

import { Breakdown } from '../modules/Breakdown'
import { BreakdownStore } from '../modules/Breakdown/stores'

export const BreakdownStoreContext = createContext<BreakdownStore | null>(null)

const BreakdownPage: NextPage = () => {
    const store = new BreakdownStore()

    return (
        <BreakdownStoreContext.Provider value={store}>
            <Breakdown />
        </BreakdownStoreContext.Provider>
    )
}

export default BreakdownPage
