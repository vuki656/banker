import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'

import { rateSelect } from '../../../resolvers/transaction/graphql'
import { orm } from '../../orm'

export const RateFactory = {
    build: (input?: Partial<Prisma.RateCreateInput>) => {
        return {
            code: 'USD',
            value: faker.datatype.number(),
            ...input,
        } satisfies Prisma.RateCreateInput
    },
    create: (input?: Partial<Prisma.RateCreateInput>) => {
        return orm.rate.create({
            data: {
                ...RateFactory.build(),
                ...input,
            },
            select: rateSelect,
        })
    },
    createMany: async (
        amount: number,
        input?: Partial<Prisma.RateCreateInput>
    ) => {
        const promises = [...new Array(amount)].map(() => {
            return orm.rate.create({
                data: RateFactory.build(input),
                select: rateSelect,
            })
        })

        return Promise.all(promises)
    },
}

