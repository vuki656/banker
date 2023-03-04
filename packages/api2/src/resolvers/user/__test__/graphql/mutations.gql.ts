import { gql } from 'graphql-tag'

import { USER_PAYLOAD } from './fragments.gql'

export const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            user {
                ...UserPayload
            }
        }
    }
    ${USER_PAYLOAD}
`

export const LOGIN_USER = gql`
    mutation LoginUser($input: LoginUserInput!) {
        loginUser(input: $input) {
            token
            user {
                ...UserPayload
            }
        }
    }
    ${USER_PAYLOAD}
`
