import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class DiscardTransactionInput {
    @Field(() => ID)
    public id: string
}
