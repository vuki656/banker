import { useContext } from 'react'

import { CategoryStoreContext } from '../../../pages/categories/[categoryId]'
import type { CategoryStore } from '../stores'

export function useCategoryStore(): CategoryStore {
    const context = useContext(CategoryStoreContext)

    if (!context) {
        throw new Error('Missing CategoryStoreContext.Provider')
    }

    return context
}
