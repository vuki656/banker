import {
    Field,
    ObjectType,
} from 'type-graphql'

import { CategoryType } from '../types'

@ObjectType()
export class UpdateCategoryPayload {
    @Field(() => CategoryType)
    public category: CategoryType
}
