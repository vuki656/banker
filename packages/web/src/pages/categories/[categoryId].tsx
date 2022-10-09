import dayjs from 'dayjs'
import type { NextPage } from 'next'
import { createContext } from 'react'

import type {
    GetCategoryPageDataQuery,
    GetCategoryPageDataQueryVariables,
} from '../../graphql/types.generated'
import { GetCategoryPageDataDocument } from '../../graphql/types.generated'
import {
    CategorySingleView,
    CategoryStore,
} from '../../modules'
import type { PageContext } from '../../shared/auth'
import type {
    CategoryType,
    TransactionType,
} from '../../shared/types'

export const CategoryStoreContext = createContext<CategoryStore | null>(null)

export type CategoryPageData = {
    category: CategoryType
    endDate: Date
    startDate: Date
    transactions: TransactionType[]
}

const CategoryPage: NextPage<CategoryPageData> = (props) => {
    const store = new CategoryStore({
        category: props.category,
        endDate: props.endDate,
        startDate: props.startDate,
        transactions: props.transactions,
    })

    return (
        <CategoryStoreContext.Provider value={store}>
            <CategorySingleView />
        </CategoryStoreContext.Provider>
    )
}

CategoryPage.getInitialProps = async (context: PageContext): Promise<CategoryPageData> => {
    const categoryId = context.query.categoryId as string

    const startDate = dayjs()
        .startOf('month')
        .subtract(3, 'months')
        .toDate()

    const endDate = dayjs().toDate()

    const response = await context.apolloClient.query<
        GetCategoryPageDataQuery,
        GetCategoryPageDataQueryVariables
    >({
        query: GetCategoryPageDataDocument,
        variables: {
            categoryArgs: {
                id: categoryId,
            },
            transactionArgs: {
                categoryId,
                endDate: endDate.toString(),
                startDate: startDate.toString(),
            },
        },
    })

    if (!response.data.category) {
        throw new Error(`Unable to fetch category by ID ${categoryId}`)
    }

    return {
        category: response.data.category,
        endDate,
        startDate,
        transactions: response.data.transactions,
    }
}

export default CategoryPage
