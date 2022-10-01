import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'

@ObjectType({ implements: BaseType })
export class UserType extends BaseType {
    @Field(() => String)
    public currency: string

    @Field(() => String)
    public email: string

    @Field(() => String)
    public firstName: string

    @Field(() => String)
    public lastName: string
}
