import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'
import getConfig from 'next/config'

import { COOKIE_TOKEN_NAME } from '../constants'

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

export const link = authLink.concat(httpLink)
