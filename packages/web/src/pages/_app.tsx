import { ApolloProvider } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { getCookie } from 'cookies-next'
import NextApp from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import withApollo from 'next-with-apollo'

import {
    GlobalStyles,
    Root,
    ThemeRoot,
} from '../components'
import type { AppProps } from '../shared/auth'
import {
    initApolloClient,
    withCurrentUser,
} from '../shared/auth'
import { COOKIE_COLORSCHEME_NAME } from '../shared/constants'

const App = (props: AppProps) => {
    const {
        Component,
        apollo,
        colorScheme,
        pageProps,
    } = props

    const router = useRouter()

    const isAppAppRoute = router.pathname !== '/' &&
        !router.pathname.startsWith('/login') &&
        !router.pathname.startsWith('/register')

    return (
        <>
            <Head>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            <ThemeRoot colorScheme={colorScheme}>
                <ModalsProvider>
                    <GlobalStyles />
                    <Notifications />
                    <ApolloProvider client={apollo}>
                        {isAppAppRoute ? (
                            <Root>
                                <Component {...pageProps} />
                            </Root>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </ApolloProvider>
                </ModalsProvider>
            </ThemeRoot>
        </>
    )
}

App.getInitialProps = async (appProps: any) => {
    const initialProps = await NextApp.getInitialProps(appProps)

    return {
        ...initialProps,
        colorScheme: getCookie(COOKIE_COLORSCHEME_NAME, appProps.ctx) ?? 'light',
    }
}

export default withApollo(initApolloClient, { getDataFromTree })(withCurrentUser(App))
