import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../types'

@ObjectType()
export class UpdateUserPayload {
    @Field(() => UserType)
    public user: UserType
}
