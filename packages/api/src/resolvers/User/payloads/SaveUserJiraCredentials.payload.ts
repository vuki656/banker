import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../types'

@ObjectType()
export class SaveUserJiraCredentialsPayload {
    @Field(() => UserType)
    public user: UserType
}
