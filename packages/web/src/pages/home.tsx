import dayjs from 'dayjs'
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
    Home,
    HomeStore,
} from '../modules'
import type {
    CategoryType,
    TransactionType,
} from '../shared/types'
import type { PageContext } from '../utils'

export const HomeStoreContext = createContext<HomeStore | null>(null)

export type HomePageData = {
    categories: CategoryType[]
    currentMonthTransactions: TransactionType[]
    previousMonthTransactions: TransactionType[]
}

const HomePage: NextPage<HomePageData> = (props) => {
    const store = new HomeStore({
        categories: props.categories,
        currentMonthTransactions: props.currentMonthTransactions,
        previousMonthTransactions: props.previousMonthTransactions,
    })

    return (
        <HomeStoreContext.Provider value={store}>
            <Home />
        </HomeStoreContext.Provider>
    )
}

HomePage.getInitialProps = async (context: PageContext): Promise<HomePageData> => {
    const categoriesResponse = await context.apolloClient.query<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
    >({
        query: GetCategoriesDocument,
    })

    const pastMonthTransactionsResponse = await context.apolloClient.query<
        GetTransactionsQuery,
        GetTransactionsQueryVariables
    >({
        fetchPolicy: 'network-only',
        query: GetTransactionsDocument,
        variables: {
            args: {
                endDate: dayjs()
                    .subtract(1, 'month')
                    .toString(),
                startDate: dayjs()
                    .subtract(1, 'month')
                    .startOf('month')
                    .toString(),
            },
        },
    })

    const currentMonthTransactionsResponse = await context.apolloClient.query<
        GetTransactionsQuery,
        GetTransactionsQueryVariables
    >({
        fetchPolicy: 'network-only',
        query: GetTransactionsDocument,
        variables: {
            args: {
                endDate: dayjs().toString(),
                startDate: dayjs()
                    .startOf('month')
                    .toString(),
            },
        },
    })

    return {
        categories: categoriesResponse.data.categories,
        currentMonthTransactions: currentMonthTransactionsResponse.data.transactions,
        previousMonthTransactions: pastMonthTransactionsResponse.data.transactions,
    }
}

export default HomePage
