import {
    Field,
    ID,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class DeleteCategoryPayload {
    @Field(() => ID)
    public id: string
}
