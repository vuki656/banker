import { faker } from "@faker-js/faker"
import { Prisma } from "@prisma/client"
import { v4 } from "uuid"
import { categorySelect } from "../../../resolvers/category"
import { orm } from "../../orm"
import { UserFactory } from "./user.factory"

export const CategoryFactory = {
    build: (input?: Partial<Prisma.CategoryCreateInput>): Prisma.CategoryCreateInput => {
        return {
            id: v4(),
            name: faker.lorem.word(),
            color: faker.color.rgb({ format: 'hex' }),
            icon: faker.lorem.word(),
            user: {
                create: UserFactory.build()
            },
            ...input,
        }
    },
    create: (input?: Partial<Prisma.CategoryCreateInput>) => {
        return orm.category.create({
            select: categorySelect,
            data: {
                ...CategoryFactory.build(),
                ...input,
            },
        })
    },
    createMany: async (
        amount: number,
        input?: Partial<Prisma.CategoryCreateInput>
    ) => {
        const promises =  [...new Array(amount)].map(() => {
            return orm.category.create({
                select: categorySelect,
                data: CategoryFactory.build(input)
            })
        })

        return Promise.all(promises)
    },
}
