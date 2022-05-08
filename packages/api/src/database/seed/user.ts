/* eslint-disable etc/no-commented-out-code */

import { orm } from '../../shared/orm'

const remove = orm.user.deleteMany()

const create = orm.user.create({
    data: {
        email: 'off.vukovic@gmail.com',
        firstName: 'Domagoj',
        lastName: 'Vukovic', // cspell:disable-next-line
        password: '$2a$04$4glLmb.j3a4uTW8rJQajYOumR0AthqFxUEL6HWIXsAav.icqhdrNy', // 123123123
    },
})

export const user = [remove, create]
