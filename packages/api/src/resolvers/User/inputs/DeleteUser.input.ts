import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class DeleteUserInput {
    @Field(() => ID)
    public id: string
}
