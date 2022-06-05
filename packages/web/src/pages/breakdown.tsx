import dayjs from 'dayjs'
import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    CategoryType,
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
    GetTransactionsQuery,
    GetTransactionsQueryVariables,
    TransactionType,
} from '../graphql/types.generated'
import {
    GetCategoriesDocument,
    GetTransactionsDocument,
} from '../graphql/types.generated'
import { Breakdown } from '../modules/Breakdown'
import { BreakdownStore } from '../modules/Breakdown/stores'

import type { PageContext } from './_app'

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

BreakdownPage.getInitialProps = async (context: PageContext) => {
    const transactionsResponse = await context.apolloClient.query<GetTransactionsQuery, GetTransactionsQueryVariables>({
        query: GetTransactionsDocument,
        variables: {
            args: {
                endDate: dayjs().toISOString(),
                startDate: dayjs()
                    .startOf('month')
                    .toISOString(),
            },
        },
    })

    const categoriesResponse = await context.apolloClient.query<GetCategoriesQuery, GetCategoriesQueryVariables>({
        query: GetCategoriesDocument,
    })

    return {
        categories: categoriesResponse.data.categories,
        transactions: transactionsResponse.data.transactions,
    }
}

export default BreakdownPage
