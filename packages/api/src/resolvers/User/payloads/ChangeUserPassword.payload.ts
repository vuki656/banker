import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../types'

@ObjectType()
export class ChangeUserPasswordPayload {
    @Field(() => UserType)
    public user: UserType
}
