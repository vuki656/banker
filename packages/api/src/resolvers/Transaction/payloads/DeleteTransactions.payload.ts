import {
    Field,
    ObjectType,
} from 'type-graphql'

import { TransactionType } from '../types'

@ObjectType()
export class DeleteTransactionPayload {
    @Field(() => TransactionType)
    public transaction: TransactionType
}
