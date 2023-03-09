import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'

import { orm } from '../../orm'

export const UserFactory = {
    build: (input?: Partial<Prisma.UserCreateInput>): Prisma.UserCreateInput => {
        return {
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
            data: {
                ...UserFactory.build(),
                ...input,
            },
        })
    },
    createMany: async (amount: number) => {
        return orm.user.createMany({
            data: [...new Array(amount)].map(() => {
                return UserFactory.build()
            }),
        })
    },
}
