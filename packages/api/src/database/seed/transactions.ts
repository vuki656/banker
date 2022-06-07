import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { v4 as UUID } from 'uuid'

import { TransactionStatusEnum } from '../../resolvers/Transaction/enums'
import { orm } from '../../shared/orm'

import {
    categoryIds,
    userId,
} from './user'
import {
    randomEnumValue,
    randomObjectValue,
} from './utils'

const remove = orm.transaction.deleteMany()

const dates: dayjs.Dayjs[] = []

let currentDate = dayjs().startOf('year')

while (currentDate.isBefore(dayjs())) {
    currentDate = currentDate.add(1, 'day')

    dates.push(currentDate)
}

const transactionData: Prisma.TransactionCreateManyInput[] = []

for (const date of dates) {
    const numberOfTransactions = faker.datatype.number({ max: 4, min: 0 })

    for (let index = 0; index < numberOfTransactions; index++) {
        transactionData.push({
            amount: faker.datatype.float({ max: 300, min: 1, precision: 0.2 }),
            categoryFk: randomObjectValue(categoryIds),
            currency: 'HRK',
            date: date.toDate(),
            description: faker.lorem.text(),
            reference: UUID(),
            status: randomEnumValue(TransactionStatusEnum),
            userFk: userId,
        })
    }
}

const create = orm.transaction.createMany({
    data: transactionData,
})

export const transactions = [remove, create]
