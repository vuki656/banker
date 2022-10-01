import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'

@ObjectType({ implements: BaseType })
class KeywordType extends BaseType {
    @Field(() => String)
    public name: string
}

@ObjectType({ implements: BaseType })
export class CategoryType extends BaseType {
    @Field(() => String)
    public color: string

    @Field(() => String)
    public icon: string

    @Field(() => [KeywordType])
    public keywords: KeywordType[]

    @Field(() => String)
    public name: string
}
