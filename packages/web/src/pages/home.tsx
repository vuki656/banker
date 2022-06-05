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
    Home,
    HomeStore,
} from '../modules'

import type { PageContext } from './_app'

export const HomeStoreContext = createContext<HomeStore | null>(null)

type HomePageProps = {
    categories: CategoryType[]
    transactions: TransactionType[]
}

const HomePage: NextPage<HomePageProps> = (props) => {
    const { categories, transactions } = props

    const store = new HomeStore(transactions, categories)

    return (
        <HomeStoreContext.Provider value={store}>
            <Home />
        </HomeStoreContext.Provider>
    )
}

HomePage.getInitialProps = async (context: PageContext) => {
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

export default HomePage
