import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class LoginUserPayload {
    @Field(() => String)
    public token: string
}
