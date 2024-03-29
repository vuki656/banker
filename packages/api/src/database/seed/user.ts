import { v4 } from 'uuid'

import { orm } from '../../shared/orm'

export const USER_ID = v4()

export const seedUsers = async () => {
    return orm.user.create({
        data: {
            email: 'off.vukovic@gmail.com',
            firstName: 'Domagoj',
            id: USER_ID,
            lastName: 'Vukovic', // cspell:disable-next-line
            password: '$2a$04$4glLmb.j3a4uTW8rJQajYOumR0AthqFxUEL6HWIXsAav.icqhdrNy', // 123123123,
        },
    })
}
