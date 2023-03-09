import { gql } from 'graphql-tag'

export const CATEGORY_PAYLOAD = gql`
    fragment CategoryPayload on Category {
        id
        name
        color
        icon
        keywords {
            id
            name
        }
    }
`

