// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!! THIS FILE WAS AUTOGENERATED, DO NOT EDIT MANUALLY !!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

import {
    Field,
    Int,
    ObjectType,
} from 'type-graphql'

@ObjectType('PageInfo')
class PageInfo {
    @Field(() => Boolean)
    public hasNextPage: boolean

    @Field(() => Boolean)
    public hasPreviousPage: boolean

    @Field(() => String, { nullable: true })
    public startCursor?: string | null

    @Field(() => String, { nullable: true })
    public endCursor?: string | null
}

import { UserType } from '../../resolvers'

@ObjectType('UserEdge')
class UserEdge {
    @Field(() => String)
    public cursor: string

    @Field(() => UserType)
    public node: UserType
}

@ObjectType('PaginatedUserType')
export class PaginatedUserType {
    @Field(() => Int)
    public totalCount: number

    @Field(() => PageInfo)
    public pageInfo: PageInfo

    @Field(() => [UserEdge])
    public edges: UserEdge[]
}
