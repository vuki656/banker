import { gql } from 'graphql-tag'

export const USER_PAYLOAD = gql`
    fragment UserPayload on User {
        id
        firstName
        lastName
        email
        currency
    }
`
