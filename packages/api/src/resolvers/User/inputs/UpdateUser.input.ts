import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    public currency: string

    @Field(() => String)
    public email: string

    @Field(() => String)
    public firstName: string

    @Field(() => ID)
    public id: string

    @Field(() => String)
    public lastName: string
}
