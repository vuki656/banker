import {
    Group,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { forwardRef } from 'react'

import { Icons } from '../../../components'

import type { TransactionCategorySelectItemProps } from './TransactionCategorySelectItem.types'

export const TransactionCategorySelectItem = forwardRef<HTMLDivElement, TransactionCategorySelectItemProps>(
    function TransactionCategorySelectItem(props, ref) {
        const {
            color,
            icon,
            label,
            ...other
        } = props

        return (
            <Group
                noWrap={true}
                ref={ref}
                {...other}
            >
                <ThemeIcon
                    color={color}
                    size="md"
                    variant="light"
                >
                    <Icons
                        name={icon}
                        size={21}
                    />
                </ThemeIcon>
                <Text size="sm">
                    {label}
                </Text>
            </Group>
        )
    }
)
