import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../types'

@ObjectType()
export class CreateUserPayload {
    @Field(() => UserType)
    public user: UserType
}
