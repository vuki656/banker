import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class DeleteTransactionInput {
    @Field(() => ID)
    public id: string
}
