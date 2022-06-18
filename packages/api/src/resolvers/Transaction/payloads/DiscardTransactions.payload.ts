import {
    Field,
    ObjectType,
} from 'type-graphql'

import { TransactionType } from '../types'

@ObjectType()
export class DiscardTransactionPayload {
    @Field(() => TransactionType)
    public transaction: TransactionType
}
