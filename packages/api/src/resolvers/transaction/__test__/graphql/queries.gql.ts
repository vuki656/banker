import gql from 'graphql-tag'

import { TRANSACTION_PAYLOAD } from './fragments.gql'

export const TRANSACTIONS = gql`
    query Transactions($args: TransactionsArgs) {
        transactions(args: $args) {
            ...TransactionPayload
        }
    }
    ${TRANSACTION_PAYLOAD}
`
