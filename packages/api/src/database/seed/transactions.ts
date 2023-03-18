import { faker } from '@faker-js/faker'
import { TransactionStatus } from '@prisma/client'
import dayjs from 'dayjs'
import { v4 } from 'uuid'

import { orm } from '../../shared/orm'
import {
    randomArrayValue,
    randomObjectValue,
} from '../../shared/utils'

import { USER_ID } from './user'

const START_DATE = dayjs()
    .subtract(2, 'months')
    .startOf('month')
    .toDate()

const END_DATE = dayjs()
    .startOf('day')
    .toDate()

export const seedTransactions = async () => {
    const categories = await orm.category.findMany()

    return orm.transaction.createMany({
        data: [...new Array(300)].map(() => {
            const category = randomArrayValue(categories)

            return {
                amount: faker.finance.amount(0, 350),
                categoryFk: category.id,
                currency: 'EUR',
                date: faker.date.between(START_DATE, END_DATE),
                description: faker.lorem.sentence(),
                reference: v4(),
                status: randomObjectValue(TransactionStatus),
                userFk: USER_ID,
            }
        }),
    })
}
