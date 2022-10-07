import type { NextComponentType } from 'next'
import type {
    AppContext,
    AppInitialProps,
    AppProps,
} from 'next/app'

import type { ExtraAppProps } from '../apollo'

export type AppComponentType = NextComponentType<AppContext, AppInitialProps, AppProps & ExtraAppProps>
