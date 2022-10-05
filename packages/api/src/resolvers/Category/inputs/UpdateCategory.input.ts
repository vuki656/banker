import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class UpdateKeywordInput {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public name: string
}

@InputType()
export class UpdateCategoryInput {
    @Field(() => String)
    public color: string

    @Field(() => String)
    public icon: string

    @Field(() => ID)
    public id: string

    @Field(() => [UpdateKeywordInput])
    public keywords: UpdateKeywordInput[]

    @Field(() => String)
    public name: string
}
