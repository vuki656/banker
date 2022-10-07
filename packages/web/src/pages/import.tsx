import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    GetImportPageDataQuery,
    GetImportPageDataQueryVariables,
} from '../graphql/types.generated'
import { GetImportPageDataDocument } from '../graphql/types.generated'
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
    const response = await context.apolloClient.query<
        GetImportPageDataQuery,
        GetImportPageDataQueryVariables
    >({
        fetchPolicy: 'network-only',
        query: GetImportPageDataDocument,
    })

    return {
        categories: response.data.categories,
        transactions: response.data.transactions,
    }
}

export default ImportPage
