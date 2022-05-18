/* eslint-disable indent */

import {
    IconBolt,
    IconCar,
    IconCoffee,
    IconHome,
    IconPizza,
    IconPlane,
    IconQuestionMark,
    IconRotateClockwise,
    IconShoppingCart,
} from '@tabler/icons'

import type { IconsProps } from './Icons.props'

export const Icons: React.FunctionComponent<IconsProps> = (props) => {
    const {
        name,
        ...other
    } = props

    switch (name) {
        case IconPizza.name:
            return <IconPizza {...other} />
        case IconShoppingCart.name:
            return <IconShoppingCart {...other} />
        case IconCar.name:
            return <IconCar {...other} />
        case IconHome.name:
            return <IconHome {...other} />
        case IconRotateClockwise.name:
            return <IconRotateClockwise {...other} />
        case IconBolt.name:
            return <IconBolt {...other} />
        case IconCoffee.name:
            return <IconCoffee {...other} />
        case IconPlane.name:
            return <IconPlane {...other} />
        default:
            return <IconQuestionMark {...other} />
    }
}
