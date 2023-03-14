import { gql } from 'graphql-tag'

import { CATEGORY_PAYLOAD } from './fragments.gql'

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($input: UpdateCategoryInput!) {
        updateCategory(input: $input) {
            category {
                ...CategoryPayload
            }
        }
    }
    ${CATEGORY_PAYLOAD}
`

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            category {
                ...CategoryPayload
            }
        }
    }
    ${CATEGORY_PAYLOAD}
`

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($input: DeleteCategoryInput!) {
        deleteCategory(input: $input) {
            id
        }
    }
`
