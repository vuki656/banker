import type { ParsedUrlQuery } from 'querystring'

const LOGIN_PATH = '/'
const LOGOUT_PATH = '/'

export function isLoginPath(path?: string): boolean {
    return path === LOGIN_PATH
}

export function isLogoutPath(path?: string): boolean {
    return path === LOGOUT_PATH
}

export function loginRedirectPath() {
    return LOGIN_PATH
}

export function getRedirectQueryParam(query?: ParsedUrlQuery): string {
    const redirectQueryParamValue = new URLSearchParams(query as Record<string, string>)

    return redirectQueryParamValue.get('from') ?? '/'
}
