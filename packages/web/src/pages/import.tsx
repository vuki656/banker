import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
    GetTransactionsQuery,
    GetTransactionsQueryVariables,
} from '../graphql/types.generated'
import {
    GetCategoriesDocument,
    GetTransactionsDocument,
} from '../graphql/types.generated'
import {
    Import,
    ImportStore,
} from '../modules'
import type { PageContext } from '../shared/auth'
import type {
    CategoryType,
    TransactionType,
} from '../shared/types'

export const ImportStoreContext = createContext<ImportStore | null>(null)

export type ImportPageData = {
    categories: CategoryType[]
    transactions: TransactionType[]
}

const ImportPage: NextPage<ImportPageData> = (props) => {
    const store = new ImportStore({
        categories: props.categories,
        transactions: props.transactions,
    })

    return (
        <ImportStoreContext.Provider value={store}>
            <Import />
        </ImportStoreContext.Provider>
    )
}

ImportPage.getInitialProps = async (context: PageContext): Promise<ImportPageData> => {
    const categoriesResponse = await context.apolloClient.query<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
    >({
        fetchPolicy: 'network-only',
        query: GetCategoriesDocument,
    })

    const transactionsResponse = await context.apolloClient.query<
        GetTransactionsQuery,
        GetTransactionsQueryVariables
    >({
        fetchPolicy: 'network-only',
        query: GetTransactionsDocument,
    })

    return {
        categories: categoriesResponse.data.categories,
        transactions: transactionsResponse.data.transactions,
    }
}

export default ImportPage
