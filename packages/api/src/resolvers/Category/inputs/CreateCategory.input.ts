import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    public name: string

    @Field(() => String)
    public color: string

    @Field(() => String)
    public icon: string

    @Field(() => [String])
    public keywords: string[]
}
