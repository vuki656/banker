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
import { useMemo } from 'react'

import type { IconsProps } from './Icons.props'

export const ICONS = [
    IconCar,
    IconHome,
    IconShoppingCart,
    IconRotateClockwise,
    IconCoffee,
    IconPizza,
    IconPlane,
    IconBolt,
]

export const Icons: React.FunctionComponent<IconsProps> = (props) => {
    const {
        fallback: Fallback,
        name,
        ...other
    } = props

    const Icon = useMemo(() => {
        const FoundIcon = ICONS.find((ICON) => {
            return ICON.name === name
        })

        if (!FoundIcon) {
            return IconQuestionMark
        }

        return FoundIcon
    }, [name])

    if (Icon.name === 'IconQuestionMark' && !name && Fallback) {
        return Fallback
    }

    return <Icon {...other} />
}
