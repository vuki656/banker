import type { NextPageContext } from 'next'

import {
    getRedirectQueryParam,
    isLoginPath,
    loginRedirectPath,
} from './routing'

export async function createServerSideAuthRedirect(context: NextPageContext): Promise<boolean> {
    if (!context.req || !context.res || context.res.headersSent) {
        return false
    }

    const url = getRedirectQueryParam(context.query)

    if (context.pathname === url) {
        return false
    }

    context.res.writeHead(302, { Location: url })

    return new Promise<boolean>((resolve) => {
        context.res?.end(() => {
            resolve(true)
        })
    })
}

export async function createServerSideUnAuthRedirect(context: NextPageContext): Promise<boolean> {
    if (!context.req || !context.res) {
        return false
    }

    if (context.res.headersSent || isLoginPath(context.pathname)) {
        return false
    }

    context.res.writeHead(302, {
        Location: loginRedirectPath(),
    })

    return new Promise<boolean>((resolve) => {
        context.res?.end(() => {
            resolve(true)
        })
    })
}
