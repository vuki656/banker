import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class UserArgs {
    @Field(() => ID)
    public id: string
}
