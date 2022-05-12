import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class DeleteCategoryInput {
    @Field(() => ID)
    public id: string
}
