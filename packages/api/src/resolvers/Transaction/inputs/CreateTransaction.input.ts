import {
    Field,
    Float,
    InputType,
} from 'type-graphql'

import { TransactionStatusEnum } from '../enums'

@InputType()
export class CreateTransactionInput {
    @Field(() => String)
    public reference: string

    @Field(() => Float)
    public amount: number

    @Field(() => String)
    public description: string

    @Field(() => String)
    public currency: string

    @Field(() => String)
    public date: string

    @Field(() => TransactionStatusEnum)
    public status: TransactionStatusEnum

    @Field(() => String, { nullable: true })
    public categoryId?: string | null
}
