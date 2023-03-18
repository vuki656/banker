import type { NextPage } from 'next'
import { createContext } from 'react'

import {
    GetCategoriesDocument,
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
} from '../graphql/types.generated'
import {
    Home,
    HomeStore,
} from '../modules'
import type { PageContext } from '../shared/auth'
import type { CategoryType } from '../shared/types'

export const HomeStoreContext = createContext<HomeStore | null>(null)

export type HomePageData = {
    categories: CategoryType[]
}

const HomePage: NextPage<HomePageData> = (props) => {
    const store = new HomeStore({
        categories: props.categories,
    })

    return (
        <HomeStoreContext.Provider value={store}>
            <Home />
        </HomeStoreContext.Provider>
    )
}

HomePage.getInitialProps = async (context: PageContext): Promise<HomePageData> => {
    const response = await context.apolloClient.query<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
    >({
        query: GetCategoriesDocument,
    })

    return {
        categories: response.data.categories,
    }
}

export default HomePage
