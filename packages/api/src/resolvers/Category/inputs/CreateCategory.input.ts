import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    public color: string

    @Field(() => String)
    public icon: string

    @Field(() => [String])
    public keywords: string[]

    @Field(() => String)
    public name: string
}
