import dayjs from 'dayjs'
import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables,
} from '../graphql/types.generated'
import { GetHomePageDataDocument } from '../graphql/types.generated'
import {
    Home,
    HomeStore,
} from '../modules'
import type { PageContext } from '../shared/auth'
import type {
    CategoryType,
    TransactionType,
} from '../shared/types'

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

// TODO: rewrite this so it fetches transactions in one query
HomePage.getInitialProps = async (context: PageContext): Promise<HomePageData> => {
    const response = await context.apolloClient.query<
        GetHomePageDataQuery,
        GetHomePageDataQueryVariables
    >({
        query: GetHomePageDataDocument,
        variables: {
            beforePreviousMonthTransactionsArgs: {
                endDate: dayjs()
                    .subtract(2, 'month')
                    .endOf('month')
                    .toISOString(),
                startDate: dayjs()
                    .subtract(2, 'month')
                    .startOf('month')
                    .toISOString(),
            },
            previousMonthTransactionsArgs: {
                endDate: dayjs()
                    .subtract(1, 'month')
                    .endOf('month')
                    .toISOString(),
                startDate: dayjs()
                    .subtract(1, 'month')
                    .startOf('month')
                    .toISOString(),
            },
        },
    })

    return {
        categories: response.data.categories,
        currentMonthTransactions: response.data.previousMonthTransactions,
        previousMonthTransactions: response.data.beforePreviousMonthTransactions,
    }
}

export default HomePage
