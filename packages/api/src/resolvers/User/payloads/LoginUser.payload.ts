import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../types'

@ObjectType()
export class LoginUserPayload {
    @Field(() => String)
    public token: string

    @Field(() => UserType)
    public user: UserType
}
