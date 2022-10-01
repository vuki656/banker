import {
    Field,
    Float,
    InputType,
} from 'type-graphql'

import { TransactionStatusEnum } from '../enums'

@InputType()
export class CreateTransactionInput {
    @Field(() => Float)
    public amount: number

    @Field(() => String, { nullable: true })
    public categoryId?: string | null

    @Field(() => String)
    public currency: string

    @Field(() => String)
    public date: string

    @Field(() => String)
    public description: string

    @Field(() => String)
    public reference: string

    @Field(() => TransactionStatusEnum)
    public status: TransactionStatusEnum
}
