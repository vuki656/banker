import {
    Field,
    Float,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class UpdateTransactionInput {
    @Field(() => Float)
    public amount: number

    @Field(() => ID, { nullable: true })
    public categoryId?: string | null

    @Field(() => String)
    public currency: string

    @Field(() => String)
    public date: string

    @Field(() => String)
    public description: string

    @Field(() => ID)
    public id: string
}
