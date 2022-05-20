import {
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'
import * as React from 'react'

import type { SidebarButtonProps } from './SidebarButton.types'

export const SidebarButton: React.FunctionComponent<SidebarButtonProps> = (props) => {
    const {
        color,
        icon,
        label,
        selected = false,
        ...other
    } = props

    return (
        <UnstyledButton
            {...other}
            sx={(theme) => ({
                '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                },
                backgroundColor: selected ? theme.colors.gray[0] : theme.white,
                borderRadius: theme.radius.sm,
                color: theme.black,
                display: 'block',
                padding: theme.spacing.xs,
                width: '100%',
            })}
        >
            <Group>
                <ThemeIcon
                    color={color}
                    variant="light"
                >
                    {icon}
                </ThemeIcon>
                <Text
                    size="sm"
                    weight={500}
                >
                    {label}
                </Text>
            </Group>
        </UnstyledButton>
    )
}
