import type { NormalizedCacheObject } from '@apollo/client'
import {
    ApolloClient,

    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getDataFromTree } from '@apollo/client/react/ssr'
import type { ColorScheme } from '@mantine/core'
import {
    AppShell,
    ColorSchemeProvider,
    Global,
    MantineProvider,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import {
    getCookie,
    setCookies,
} from 'cookies-next'
import type { ApolloPageContext } from 'next-with-apollo'
import withApollo from 'next-with-apollo'
import NextApp from 'next/app'
import type { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Sidebar } from '../components'
import introspectionGeneratedTS from '../graphql/introspection.generated.json'
import introspectionGeneratedJSON from '../graphql/types.generated'
import {
    COOKIE_COLORSCHEME_NAME,
    COOKIE_TOKEN_NAME,
    CurrentUserProvider,
} from '../utils'

export interface PageContext extends ApolloPageContext {
    apolloClient: ApolloClient<unknown>
}

type ExtraAppProps = {
    apollo: ApolloClient<NormalizedCacheObject>
    colorScheme: ColorScheme
}

const App = (props: AppProps & ExtraAppProps) => {
    const {
        Component,
        apollo,
        colorScheme,
        pageProps,
    } = props

    const router = useRouter()

    const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>(colorScheme)

    const toggleColorScheme = (newColorScheme?: ColorScheme) => {
        let nextColorScheme = newColorScheme

        if (!nextColorScheme) {
            nextColorScheme = currentColorScheme === 'dark' ? 'light' : 'dark'
        }

        setCurrentColorScheme(nextColorScheme)

        setCookies(COOKIE_COLORSCHEME_NAME, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
    }

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
            <ColorSchemeProvider
                colorScheme={currentColorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{
                        colorScheme: currentColorScheme,
                        fontFamily: 'montserrat',
                    }}
                    withGlobalStyles={true}
                    withNormalizeCSS={true}
                >
                    <ModalsProvider>
                        <NotificationsProvider>
                            <Global
                                styles={{
                                    '#__next': {
                                        height: '100%',
                                        width: '100%',
                                    },
                                    a: {
                                        textDecoration: 'none',
                                    },
                                    body: {
                                        margin: '0px',
                                    },
                                    html: {
                                        fontSize: '16px',
                                    },
                                    'html, body': {
                                        height: '100%',
                                    },
                                }}
                            />
                            <ApolloProvider client={apollo}>
                                <CurrentUserProvider>
                                    {isAppAppRoute ? (
                                        <AppShell
                                            navbar={<Sidebar />}
                                            padding="md"
                                            styles={(theme) => ({
                                                body: {
                                                    height: '100%',
                                                },
                                                main: {
                                                    display: 'flex',
                                                    flex: 1,
                                                    main: {
                                                        backgroundColor: theme.colorScheme === 'dark'
                                                            ? theme.colors.dark[8]
                                                            : theme.colors.gray[0],
                                                    },
                                                    overflowX: 'hidden',
                                                    padding: 0,
                                                    zIndex: 1,
                                                },
                                                root: {
                                                    height: '100%',
                                                },
                                            })}
                                        >
                                            <Component {...pageProps} />
                                        </AppShell>
                                    ) : (
                                        <Component {...pageProps} />
                                    )}
                                </CurrentUserProvider>
                            </ApolloProvider>
                        </NotificationsProvider>
                    </ModalsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
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

const httpLink = createHttpLink({
    uri: getConfig().publicRuntimeConfig.API_URL,
})

const authLink = setContext(() => {
    const token = getCookie(COOKIE_TOKEN_NAME)

    return {
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

export default withApollo((client) => {
    const cache = new InMemoryCache({
        possibleTypes: introspectionGeneratedJSON.possibleTypes,
        typePolicies: Object.fromEntries(introspectionGeneratedTS.__schema.types
            .filter(({ kind }) => kind === 'OBJECT')
            .map(({ name }) => [name, { merge: true }])),
    })

    if (client.initialState) {
        cache.restore(client.initialState)
    }

    return new ApolloClient({
        cache,
        link: authLink.concat(httpLink),
        ssrMode: typeof window === 'undefined',
    })
}, { getDataFromTree })(App)
