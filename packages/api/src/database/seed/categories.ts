import { faker } from '@faker-js/faker'

import { orm } from '../../shared/orm'
import { randomArrayValue } from '../../shared/utils'

import { USER_ID } from './user'

// List of icons web can render
export const ICON_LIST = [
    'IconCar',
    'IconHome',
    'IconShoppingCart',
    'IconRotateClockwise',
    'IconCoffee',
    'IconPizza',
    'IconPlane',
    'IconBolt',
    'IconCoin',
    'IconShirt',
    'IconBuildingBank',
    'IconCash',
    'IconPlayerStop',
    'IconMovie',
    'IconBusinessplan',
    'IconDevicesPc',
]

// List of expect colors on the web
const COLORS = [
    'orange',
    'yellow',
    'red',
    'blue',
    'green',
    'violet',
    'grape',
]

export const seedCategories = async () => {
    return orm.category.createMany({
        data: [...new Array(15)].map(() => {
            return {
                color: randomArrayValue(COLORS),
                icon: randomArrayValue(ICON_LIST),
                name: faker.lorem.word(),
                userFk: USER_ID,
            }
        }),
    })
}
