import {
    Field,
    ID,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class DeleteUserPayload {
    @Field(() => ID)
    public id: string
}
