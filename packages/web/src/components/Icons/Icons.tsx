import {
    IconBolt,
    IconCar,
    IconCoffee,
    IconCoin,
    IconHome,
    IconPizza,
    IconPlane,
    IconQuestionMark,
    IconRotateClockwise,
    IconShoppingCart,
    IconShirt,
    IconBuildingBank,
    IconCash
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
    IconCoin,
    IconShirt,
    IconBuildingBank,
    IconCash
]

export const Icons: React.FunctionComponent<IconsProps> = (props) => {
    const {
        fallback: FallbackIcon,
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

    if (Icon.name === 'IconQuestionMark' && !name && FallbackIcon) {
        return FallbackIcon
    }

    return <Icon {...other} />
}
