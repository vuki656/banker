import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client'
import {
    AppShell,
    Global,
    MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import Cookies from 'js-cookie'
import type { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Sidebar } from '../components'
import { COOKIE_TOKEN_NAME } from '../utils'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    headers: {
        'Authorization': `Bearer ${Cookies.get(COOKIE_TOKEN_NAME)}`,
    },
    ssrMode: typeof window === 'undefined',
    uri: getConfig().publicRuntimeConfig.API_URL,
})

export default function(props: AppProps) {
    const {
        Component,
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
                <NotificationsProvider>
                    <Global
                        styles={{
                            'body, html, #__next': {
                                height: '100%',
                            },
                        }}
                    />
                    <ApolloProvider client={client}>
                        {isNotAuthorized ? (
                            <Component {...pageProps} />
                        ) : (
                            <AppShell
                                navbar={<Sidebar />}
                                padding="md"
                                styles={(theme) => ({
                                    body: {
                                        height: '100%',
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
            </MantineProvider>
        </>
    )
}
