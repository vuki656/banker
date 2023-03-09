import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'
import { userSelect } from '../../../resolvers/user/user.select'

import { orm } from '../../orm'

export const UserFactory = {
    build: (input?: Partial<Prisma.UserCreateInput>): Prisma.UserCreateInput => {
        return {
            id: v4(),
            currency: faker.finance.currencyCode(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.internet.password(),
            ...input,
        }
    },
    create: (input?: Partial<Prisma.UserCreateInput>) => {
        return orm.user.create({
            select: userSelect,
            data: {
                ...UserFactory.build(),
                ...input,
            },
        })
    },
    createMany: async (
        amount: number,
        input: Partial<Prisma.UserCreateInput>
    ) => {
        const promises =  [...new Array(amount)].map(() => {
            return orm.user.create({
                select: userSelect,
                data: UserFactory.build(input)
            })
        })

        return Promise.all(promises)
    },
}
