import {
    Field,
    ObjectType,
} from 'type-graphql'

import { TransactionType } from '../types'

@ObjectType()
export class CreateTransactionPayload {
    @Field(() => TransactionType)
    public transaction: TransactionType
}
