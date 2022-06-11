import { useContext } from 'react'

import { TransactionsStoreContext } from '../../../pages/transactions'
import type { TransactionsStore } from '../stores'

export function useTransactionsStore(): TransactionsStore {
    const context = useContext(TransactionsStoreContext)

    if (!context) {
        throw new Error('Missing TransactionsStoreContext.Provider')
    }

    return context
}
