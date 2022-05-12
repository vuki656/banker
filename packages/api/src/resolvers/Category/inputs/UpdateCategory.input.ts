import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class UpdateCategoryInput {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public name: string

    @Field(() => String)
    public color: string

    @Field(() => String)
    public icon: string
}
