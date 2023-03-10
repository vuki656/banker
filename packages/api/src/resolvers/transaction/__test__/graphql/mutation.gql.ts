import gql from 'graphql-tag'

import { TRANSACTION_PAYLOAD } from './fragments.gql'

export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($input: UpdateTransactionInput!) {
        updateTransaction(input: $input) {
            transaction {
                ...TransactionPayload
            }
        }
    }
    ${TRANSACTION_PAYLOAD}
`

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($input: CreateTransactionInput!) {
        createTransaction(input: $input) {
            transaction {
                ...TransactionPayload
            }
        }
    }
    ${TRANSACTION_PAYLOAD}
`
