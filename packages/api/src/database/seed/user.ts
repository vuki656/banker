/* eslint-disable etc/no-commented-out-code */

import { v4 as UUID } from 'uuid'

import { orm } from '../../shared/orm'

export const userId = UUID()

export const categoryIds = {
    bars: UUID(),
    groceries: UUID(),
    restaurants: UUID(),
    subscriptions: UUID(),
    transport: UUID(),
    travel: UUID(),
    utilities: UUID(),
}

const remove = orm.user.deleteMany()

const create = orm.user.create({
    data: {
        categories: {
            create: [
                {
                    color: 'orange',
                    icon: 'IconPizza',
                    id: categoryIds.restaurants,
                    keywords: {
                        create: [
                            { name: 'wolt' },
                            { name: 'glovo' },
                        ],
                    },
                    name: 'Restaurants',
                },
                {
                    color: 'black',
                    icon: 'IconCar',
                    id: categoryIds.transport,
                    keywords: {
                        create: [
                            { name: 'uber' },
                            { name: 'bolt' },
                            { name: 'cazmatrans' },
                        ],
                    },
                    name: 'Transport',
                },
                {
                    color: 'green',
                    icon: 'IconHome',
                    keywords: {
                        create: [
                            { name: 'jadranka' },
                        ],
                    },
                    name: 'Rent',
                },
                {
                    color: 'red',
                    icon: 'IconBolt',
                    id: categoryIds.utilities,
                    keywords: {
                        create: [
                            { name: 'elekta' },
                            { name: 'toplinarstvo' },
                            { name: 'a1' },
                            { name: 'holding' },
                        ],
                    },
                    name: 'Utilities',
                },
                {
                    color: 'red',
                    icon: 'IconRotateClockwise',
                    id: categoryIds.subscriptions,
                    keywords: {
                        create: [
                            { name: 'hbo' },
                            { name: 'netflix' },
                            { name: 'google one' },
                            { name: 'youtube music' },
                        ],
                    },
                    name: 'Subscriptions',
                },
                {
                    color: 'purple',
                    icon: 'IconCoffee',
                    id: categoryIds.bars,
                    keywords: {
                        create: [
                            { name: 'kava' },
                        ],
                    },
                    name: 'Bars',
                },
                {
                    color: 'blue',
                    icon: 'IconShoppingCart',
                    id: categoryIds.groceries,
                    keywords: {
                        create: [
                            { name: 'konzum' },
                            { name: 'spar' },
                        ],
                    },
                    name: 'Groceries',
                },
                {
                    color: 'red',
                    icon: 'IconPlane',
                    id: categoryIds.travel,
                    name: 'Travel',
                },
            ],
        },
        email: 'off.vukovic@gmail.com',
        firstName: 'Domagoj',
        id: userId,
        lastName: 'Vukovic',
        // cspell:disable-next-line
        password: '$2a$04$4glLmb.j3a4uTW8rJQajYOumR0AthqFxUEL6HWIXsAav.icqhdrNy', // 123123123
    },
})

export const user = [remove, create]
