import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class TransactionsArgs {
    @Field(() => Date, { nullable: true })
    public startDate?: Date | null

    @Field(() => Date, { nullable: true })
    public endDate?: Date | null
}
