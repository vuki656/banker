import {
    IconBolt,
    IconBuildingBank,
    IconCar,
    IconCash,
    IconCoffee,
    IconCoin,
    IconHome,
    IconPizza,
    IconPlane,
    IconQuestionMark,
    IconRotateClockwise,
    IconShirt,
    IconShoppingCart,
} from '@tabler/icons'
import { cloneElement } from 'react'

import type { IconsProps } from './Icons.props'

export const ICONS = [
    <IconCar key="IconCar" />,
    <IconHome key="IconHome" />,
    <IconShoppingCart key="IconShoppingCart" />,
    <IconRotateClockwise key="IconRotateClockwise" />,
    <IconCoffee key="IconCoffee" />,
    <IconPizza key="IconPizza" />,
    <IconPlane key="IconPlane" />,
    <IconBolt key="IconBolt" />,
    <IconCoin key="IconCoin" />,
    <IconShirt key="IconShirt" />,
    <IconBuildingBank key="IconBuildingBank" />,
    <IconCash key="IconCash" />,
]

export const Icons: React.FunctionComponent<IconsProps> = (props) => {
    const {
        fallback: Fallback,
        name,
        ...other
    } = props

    const FoundIcon = ICONS.find((Icon) => {
        return String(Icon.key) === name
    })

    if (FoundIcon) {
        return cloneElement(FoundIcon, { ...other })
    }

    if (Fallback) {
        return cloneElement(Fallback, { ...other })
    }

    return <IconQuestionMark {...other} />
}
