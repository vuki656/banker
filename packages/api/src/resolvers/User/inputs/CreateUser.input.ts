import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateUserInput {
    @Field(() => String)
    public firstName: string

    @Field(() => String)
    public lastName: string

    @Field(() => String)
    public password: string

    @Field(() => String)
    public email: string
}
