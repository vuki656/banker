import {
    Field,
    Float,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class UpdateTransactionInput {
    @Field(() => ID)
    public id: string

    @Field(() => Float)
    public amount: number

    @Field(() => String)
    public currency: string

    @Field(() => String)
    public date: string

    @Field(() => String)
    public description: string

    @Field(() => ID, { nullable: true })
    public categoryId?: string | null
}
