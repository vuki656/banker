import type { NextPage } from 'next'
import { createContext } from 'react'

import {
    Import,
    ImportStore,
} from '../modules'

export const ImportStoreContext = createContext<ImportStore | null>(null)

const ImportPage: NextPage = () => {
    const store = new ImportStore()

    return (
        <ImportStoreContext.Provider value={store}>
            <Import />
        </ImportStoreContext.Provider>
    )
}

export default ImportPage
