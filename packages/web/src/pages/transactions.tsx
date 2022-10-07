import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
} from '../graphql/types.generated'
import { GetCategoriesDocument } from '../graphql/types.generated'
import {
    Transactions,
    TransactionsStore,
} from '../modules'
import type { PageContext } from '../shared/auth'
import type { CategoryType } from '../shared/types'

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

TransactionsPage.getInitialProps = async (context: PageContext): Promise<TransactionsPageData> => {
    const categoriesResponse = await context.apolloClient.query<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
    >({
        fetchPolicy: 'network-only',
        query: GetCategoriesDocument,
    })

    return {
        categories: categoriesResponse.data.categories,
    }
}

export default TransactionsPage
