import type { NextPage } from 'next'
import { createContext } from 'react'

import { Home } from '../modules'
import { HomeStore } from '../modules/Home/stores'

export const HomeStoreContext = createContext<HomeStore | null>(null)

const HomePage: NextPage = () => {
    return (
        <HomeStoreContext.Provider value={new HomeStore()}>
            <Home />
        </HomeStoreContext.Provider>
    )
}

export default HomePage
