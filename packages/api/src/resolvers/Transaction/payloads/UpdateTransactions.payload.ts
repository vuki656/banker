import {
    Field,
    ObjectType,
} from 'type-graphql'

import { TransactionType } from '../types'

@ObjectType()
export class UpdateTransactionPayload {
    @Field(() => TransactionType)
    public transaction: TransactionType
}
