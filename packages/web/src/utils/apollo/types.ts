import type {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client'
import type { ColorScheme } from '@mantine/core'
import type { ApolloPageContext } from 'next-with-apollo'
import type { AppProps as NextAppProps } from 'next/app'

export interface PageContext extends ApolloPageContext {
    apolloClient: ApolloClient<unknown>
}

export type ExtraAppProps = {
    apollo: ApolloClient<NormalizedCacheObject>
    colorScheme: ColorScheme
}

export type AppProps = ExtraAppProps & NextAppProps
