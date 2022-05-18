import { registerEnumType } from 'type-graphql'

export enum TransactionStatusEnum {
    DISCARDED = 'DISCARDED',
    DONE = 'DONE',
    SKIPPED = 'SKIPPED'
}

registerEnumType(TransactionStatusEnum, { name: 'TransactionStatusEnum' })
