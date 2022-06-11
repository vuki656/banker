import type { NextPage } from 'next'
import { createContext } from 'react'

import {
    Transactions,
    TransactionsStore,
} from '../modules'

export const TransactionsStoreContext = createContext<TransactionsStore | null>(null)

const TransactionsPage: NextPage = () => {
    const store = new TransactionsStore()

    return (
        <TransactionsStoreContext.Provider value={store}>
            <Transactions />
        </TransactionsStoreContext.Provider>
    )
}

export default TransactionsPage
