import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    CategoryType,
    GetCategoriesQuery,
    GetTransactionsQuery,
    GetTransactionsQueryVariables,
    TransactionType,
} from '../graphql/types.generated'
import {
    GetCategoriesDocument,
    GetTransactionsDocument,
} from '../graphql/types.generated'
import {
    Import,
    ImportStore,
} from '../modules'

import type { PageContext } from './_app'

export const ImportStoreContext = createContext<ImportStore | null>(null)

type ImportPageProps = {
    categories: CategoryType[]
    transactions: TransactionType[]
}

const ImportPage: NextPage<ImportPageProps> = (props) => {
    const { categories, transactions } = props

    const store = new ImportStore(transactions, categories)

    return (
        <ImportStoreContext.Provider value={store}>
            <Import />
        </ImportStoreContext.Provider>
    )
}

ImportPage.getInitialProps = async (context: PageContext) => {
    const categoriesResponse = await context.apolloClient.query<GetCategoriesQuery>({
        query: GetCategoriesDocument,
    })

    const transactionsResponse = await context.apolloClient.query<GetTransactionsQuery, GetTransactionsQueryVariables>({
        query: GetTransactionsDocument,
    })

    return {
        categories: categoriesResponse.data.categories,
        transactions: transactionsResponse.data.transactions,
    }
}

export default ImportPage
