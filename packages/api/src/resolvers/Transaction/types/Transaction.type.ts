import type { TransactionStatus } from '@prisma/client'
import {
    Field,
    Float,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'
import { CategoryType } from '../../Category'
import { TransactionStatusEnum } from '../enums'

@ObjectType()
class AmountType {
    @Field(() => Float)
    public converted: number

    @Field(() => Float)
    public original: number
}

@ObjectType({ implements: BaseType })
export class TransactionType extends BaseType {
    @Field(() => AmountType)
    public amount: AmountType

    @Field(() => CategoryType, { nullable: true })
    public category: CategoryType | null

    @Field(() => String)
    public currency: string

    @Field(() => Date)
    public date: Date

    @Field(() => String)
    public description: string

    @Field(() => String)
    public reference: string

    @Field(() => TransactionStatusEnum) // eslint-disable-next-line type-graphql/invalid-decorated-type
    public status: TransactionStatus
}
