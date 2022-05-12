import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'

@ObjectType({ implements: BaseType })
export class CategoryType extends BaseType {
    @Field(() => String)
    public name: string

    @Field(() => String)
    public color: string

    @Field(() => String)
    public icon: string
}
