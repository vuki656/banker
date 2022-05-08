import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class LoginUserInput {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public password: string
}
