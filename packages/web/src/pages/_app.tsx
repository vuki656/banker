import type { NormalizedCacheObject } from '@apollo/client'
import {
    ApolloClient,

    ApolloProvider,
    InMemoryCache,
} from '@apollo/client'
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
import { getCookie } from 'cookies-next'
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
import { COOKIE_TOKEN_NAME } from '../utils'

export interface PageContext extends ApolloPageContext {
    apolloClient: ApolloClient<unknown>
}

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

    const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

    const toggleColorScheme = (value?: ColorScheme) => {
        if (!value) {
            setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')

            return
        }

        setColorScheme(value)
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
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{
                        colorScheme,
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
                                {isAppAppRoute ? (
                                    <AppShell
                                        navbar={<Sidebar />}
                                        padding="md"
                                        styles={(theme) => ({
                                            body: {
                                                height: '100%',
                                            },
                                            main: {
                                                main: {
                                                    backgroundColor: theme.colorScheme === 'dark'
                                                        ? theme.colors.dark[8]
                                                        : theme.colors.gray[0],
                                                },
                                                padding: 0,
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
                            </ApolloProvider>
                        </NotificationsProvider>
                    </ModalsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
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

    const cache = new InMemoryCache({
        possibleTypes: introspectionGeneratedJSON.possibleTypes,
        typePolicies: Object.fromEntries(introspectionGeneratedTS.__schema.types
            .filter(({ kind }) => kind === 'OBJECT')
            .map(({ name }) => [name, { merge: true }])),
    })

    if (initialState) {
        cache.restore(initialState)
    }

    return new ApolloClient({
        cache: new InMemoryCache().restore(initialState || {}),
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        ssrMode: typeof window === 'undefined',
        uri: getConfig().publicRuntimeConfig.API_URL,
    })
}, { getDataFromTree })(App)
