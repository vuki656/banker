import type { NormalizedCacheObject } from '@apollo/client'
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import {
    AppShell,
    Global,
    MantineProvider,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { getCookie } from 'cookies-next'
import withApollo from 'next-with-apollo'
import NextApp from 'next/app'
import type { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Sidebar } from '../components'
import { COOKIE_TOKEN_NAME } from '../utils'

type ExtraAppProps = {
    apollo: ApolloClient<NormalizedCacheObject>
}

const App = (props: AppProps & ExtraAppProps) => {
    const {
        Component,
        apollo,
        pageProps,
    } = props

    const router = useRouter()

    const isNotAuthorized = router.pathname === '/' ||
        router.pathname.startsWith('/login') ||
        router.pathname.startsWith('/register')

    return (
        <>
            <Head>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            <MantineProvider
                theme={{
                    colorScheme: 'light',
                    fontFamily: 'montserrat',
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                <ModalsProvider>
                    <NotificationsProvider>
                        <Global
                            styles={{
                                'body, html, #__next': {
                                    height: '100%',
                                },
                            }}
                        />
                        <ApolloProvider client={apollo}>
                            {isNotAuthorized ? (
                                <Component {...pageProps} />
                            ) : (
                                <AppShell
                                    navbar={<Sidebar />}
                                    padding="md"
                                    styles={(theme) => ({
                                        body: {
                                            height: '100%',
                                            overflow: 'hidden',
                                        },
                                        main: {
                                            backgroundColor: theme.colors.gray[0],
                                            padding: 0,
                                        },
                                        root: {
                                            height: '100%',
                                        },
                                    })}
                                >
                                    <Component {...pageProps} />
                                </AppShell>
                            )}

                        </ApolloProvider>
                    </NotificationsProvider>
                </ModalsProvider>
            </MantineProvider>
        </>
    )
}

App.getInitialProps = async (appContext: any) => {
    const appProps = await NextApp.getInitialProps(appContext)

    return { ...appProps }
}

export default withApollo(({ ctx, initialState }) => {
    const token = getCookie(COOKIE_TOKEN_NAME, {
        req: ctx?.req,
        res: ctx?.res,
    })

    return new ApolloClient({
        cache: new InMemoryCache().restore(initialState || {}),
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        ssrMode: typeof window === 'undefined',
        uri: getConfig().publicRuntimeConfig.API_URL,
    })
}, { getDataFromTree })(App)
