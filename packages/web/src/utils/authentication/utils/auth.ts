import type { NextPageContext } from 'next'

import {
    createClientSideAuthRedirect,
    createClientSideUnAuthRedirect,
} from './clientSideAuth'
import {
    createServerSideAuthRedirect,
    createServerSideUnAuthRedirect,
} from './serverSideAuth'

/**
 * Environment agnostic function used for creating redirect to homepage or search param provided url
 *
 * @default ""
 */
export async function createAuthRedirect(context?: NextPageContext): Promise<boolean> {
    if (context) {
        return createServerSideAuthRedirect(context)
    }

    return createClientSideAuthRedirect()
}

/**
 * Environment agnostic function used for redirecting to page for authentication
 *
 * @default ""
 */
export async function createUnAuthRedirect(context?: NextPageContext): Promise<boolean> {
    if (context) {
        return createServerSideUnAuthRedirect(context)
    }

    return createClientSideUnAuthRedirect()
}
