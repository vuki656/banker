import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class TransactionsArgs {
    @Field(() => String, { nullable: true })
    public categoryId?: string | null

    @Field(() => Date, { nullable: true })
    public endDate?: Date | null

    @Field(() => Date, { nullable: true })
    public startDate?: Date | null
}
