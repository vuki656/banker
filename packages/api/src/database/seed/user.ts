/* eslint-disable etc/no-commented-out-code */

import { orm } from '../../shared/orm'

const remove = orm.user.deleteMany()

const create = orm.user.create({
    data: {
        categories: {
            create: [
                {
                    color: 'orange',
                    icon: 'IconPizza',
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
                    icon: 'IconReceipt',
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
                    keywords: {
                        create: [
                            { name: 'hbo' },
                            { name: 'netflix' },
                            { name: 'google one' },
                        ],
                    },
                    name: 'Subscriptions',
                },
            ],
        },
        email: 'off.vukovic@gmail.com',
        firstName: 'Domagoj',
        lastName: 'Vukovic',
        // cspell:disable-next-line
        password: '$2a$04$4glLmb.j3a4uTW8rJQajYOumR0AthqFxUEL6HWIXsAav.icqhdrNy', // 123123123
    },
})

export const user = [remove, create]
