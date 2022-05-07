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
    } = props

    return (
        <UnstyledButton
            sx={(theme) => ({
                '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                },
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
