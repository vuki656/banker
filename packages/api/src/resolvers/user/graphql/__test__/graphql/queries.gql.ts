import { gql } from 'graphql-tag'

import { USER_PAYLOAD } from './fragments.gql'

export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            ...UserPayload
        }
    }
    ${USER_PAYLOAD}
`
