import gql from 'graphql-tag'

export const TRANSACTION_PAYLOAD = gql`
    fragment TransactionPayload on Transaction {
        id
        currency
        amount {
            original
            converted
        }
        date
        description
        reference
        status
    }
`

