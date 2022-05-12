import {
    Field,
    ObjectType,
} from 'type-graphql'

import { CategoryType } from '../types'

@ObjectType()
export class CreateCategoryPayload {
    @Field(() => CategoryType)
    public category: CategoryType
}
