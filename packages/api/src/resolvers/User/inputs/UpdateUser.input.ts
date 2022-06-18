import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public firstName: string

    @Field(() => String)
    public lastName: string

    @Field(() => String)
    public email: string

    @Field(() => String)
    public currency: string
}
