import {
    AppShell,
    Global,
    MantineProvider,
} from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Sidebar } from '../components'

export default function App(props: AppProps) {
    const {
        Component,
        pageProps,
    } = props

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
                <Global
                    styles={{
                        'body, html, #__next': {
                            height: '100%',
                        },
                    }}
                />
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
            </MantineProvider>
        </>
    )
}
