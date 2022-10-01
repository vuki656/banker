import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    CategoryType,
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
} from '../graphql/types.generated'
import { GetCategoriesDocument } from '../graphql/types.generated'
import {
    Transactions,
    TransactionsStore,
} from '../modules'
import type { PageContext } from '../utils'

export const TransactionsStoreContext = createContext<TransactionsStore | null>(null)

export type TransactionsPageData = {
    categories: CategoryType[]
}

const TransactionsPage: NextPage<TransactionsPageData> = (props) => {
    const store = new TransactionsStore({
        categories: props.categories,
    })

    return (
        <TransactionsStoreContext.Provider value={store}>
            <Transactions />
        </TransactionsStoreContext.Provider>
    )
}

TransactionsPage.getInitialProps = async (context: PageContext) => {
    const categoriesResponse = await context.apolloClient.query<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
    >({
        query: GetCategoriesDocument,
    })

    return {
        categories: categoriesResponse.data.categories,
    }
}

export default TransactionsPage
