import type { NextPage } from 'next'
import type { ApolloPageContext } from 'next-with-apollo'
import { createContext } from 'react'

import type {
    CategoryType,
    GetCategoriesQuery,
    GetTransactionsQuery,
    TransactionType,
} from '../graphql/types.generated'
import {
    GetCategoriesDocument,
    GetTransactionsDocument,
} from '../graphql/types.generated'
import { Breakdown } from '../modules/Breakdown'
import { BreakdownStore } from '../modules/Breakdown/stores'

export const BreakdownStoreContext = createContext<BreakdownStore | null>(null)

type BreakdownPageProps = {
    categories: CategoryType[]
    transactions: TransactionType[]
}

const BreakdownPage: NextPage<BreakdownPageProps> = (props) => {
    const { categories, transactions } = props

    const store = new BreakdownStore(categories, transactions)

    return (
        <BreakdownStoreContext.Provider value={store}>
            <Breakdown />
        </BreakdownStoreContext.Provider>
    )
}

BreakdownPage.getInitialProps = async (context: ApolloPageContext) => {
    const transactionResponse = await context.apolloClient.query<GetTransactionsQuery>({
        query: GetTransactionsDocument,
    })

    const categoriesResponse = await context.apolloClient.query<GetCategoriesQuery>({
        query: GetCategoriesDocument,
    })

    return {
        categories: categoriesResponse.data.categories,
        transactions: transactionResponse.data.transactions,
    }
}

export default BreakdownPage
