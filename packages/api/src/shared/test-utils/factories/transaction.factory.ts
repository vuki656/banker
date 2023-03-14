import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { TransactionStatus } from '@prisma/client'
import { v4 } from 'uuid'

import { transactionSelect } from '../../../resolvers/transaction/graphql'
import { orm } from '../../orm'
import { randomObjectValue } from '../../utils'

import { UserFactory } from './user.factory'

export const TransactionFactory = {
    build: (input?: Partial<Prisma.TransactionCreateInput>) => {
        return {
            amount: faker.datatype.number({ max: 500, min: 0 }),
            currency: 'USD',
            date: new Date(),
            description: faker.lorem.sentence(),
            id: v4(),
            reference: v4(),
            status: randomObjectValue(TransactionStatus),
            user: {
                create: UserFactory.build(),
            },
            ...input,
        } satisfies Prisma.TransactionCreateInput
    },
    create: (input?: Partial<Prisma.TransactionCreateInput>) => {
        return orm.transaction.create({
            data: {
                ...TransactionFactory.build(),
                ...input,
            },
            select: transactionSelect,
        })
    },
    createMany: async (
        amount: number,
        input?: Partial<Prisma.TransactionCreateInput>
    ) => {
        const promises = [...new Array(amount)].map(() => {
            return orm.transaction.create({
                data: TransactionFactory.build(input),
                select: transactionSelect,
            })
        })

        return Promise.all(promises)
    },
}
