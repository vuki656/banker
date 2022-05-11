import type { NextPage } from 'next'
import { createContext } from 'react'

import {
    Home,
    HomeStore,
} from '../modules'

export const HomeStoreContext = createContext<HomeStore | null>(null)

const HomePage: NextPage = () => {
    return (
        <HomeStoreContext.Provider value={new HomeStore()}>
            <Home />
        </HomeStoreContext.Provider>
    )
}

export default HomePage
