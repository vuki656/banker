import NextRouter from 'next/router'

import {
    getRedirectQueryParam,
    isLoginPath,
    loginRedirectPath,
} from './routing'

export async function createClientSideAuthRedirect(): Promise<boolean> {
    const url = getRedirectQueryParam(NextRouter.query)

    if (NextRouter.pathname === url) {
        return false
    }

    return NextRouter.replace(url)
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function createClientSideUnAuthRedirect(): Promise<boolean> {
    if (isLoginPath(NextRouter.pathname)) {
        return false
    }

    window.location.replace(loginRedirectPath())

    return true
}
