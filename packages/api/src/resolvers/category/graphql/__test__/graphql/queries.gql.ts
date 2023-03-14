import { gql } from 'graphql-tag'

import { CATEGORY_PAYLOAD } from './fragments.gql'

export const CATEGORY = gql`
    query Category($args: CategoryArgs!) {
        category(args: $args) {
            ...CategoryPayload
        }
    }
    ${CATEGORY_PAYLOAD}
`

export const CATEGORIES = gql`
    query Categories {
        categories {
            ...CategoryPayload
        }
    }
    ${CATEGORY_PAYLOAD}
`
