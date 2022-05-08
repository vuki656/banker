import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'

@ObjectType({ implements: BaseType })
export class UserType extends BaseType {
    @Field(() => String)
    public firstName: string

    @Field(() => String)
    public lastName: string

    @Field(() => String)
    public email: string
}
