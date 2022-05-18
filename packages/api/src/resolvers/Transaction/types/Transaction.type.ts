import type {
    Prisma,
    TransactionStatus,
} from '@prisma/client'
import {
    Field,
    Float,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'
import { CategoryType } from '../../Category'
import { TransactionStatusEnum } from '../enums'

@ObjectType({ implements: BaseType })
export class TransactionType extends BaseType {
    @Field(() => String)
    public reference: string

    @Field(() => String)
    public description: string

    @Field(() => String)
    public currency: string

    @Field(() => Date)
    public date: Date

    @Field(() => CategoryType, { nullable: true })
    public category: CategoryType | null

    // eslint-disable-next-line type-graphql/wrong-decorator-signature
    @Field(() => Float)
    public amount: Prisma.Decimal

    @Field(() => TransactionStatusEnum) // eslint-disable-next-line type-graphql/invalid-decorated-type
    public status: TransactionStatus
}
