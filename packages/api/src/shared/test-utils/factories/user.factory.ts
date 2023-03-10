import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'

import { userSelect } from '../../../resolvers/user/user.select'
import { orm } from '../../orm'

export const UserFactory = {
    build: (input?: Partial<Prisma.UserCreateInput>) => {
        return {
            currency: "USD",
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            id: v4(),
            lastName: faker.name.lastName(),
            password: faker.internet.password(),
            ...input,
        } satisfies Prisma.UserCreateInput
    },
    create: (input?: Partial<Prisma.UserCreateInput>) => {
        return orm.user.create({
            data: {
                ...UserFactory.build(),
                ...input,
            },
            select: userSelect,
        })
    },
    createMany: async (
        amount: number,
        input?: Partial<Prisma.UserCreateInput>
    ) => {
        const promises = [...new Array(amount)].map(() => {
            return orm.user.create({
                data: UserFactory.build(input),
                select: userSelect,
            })
        })

        return Promise.all(promises)
    },
}
