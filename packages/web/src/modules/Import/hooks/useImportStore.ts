import { useContext } from 'react'

import { ImportStoreContext } from '../../../pages/import'
import type { ImportStore } from '../stores'

export function useImportStore(): ImportStore {
    const context = useContext(ImportStoreContext)

    if (!context) {
        throw new Error('Missing ImportStoreContext.Provider')
    }

    return context
}
