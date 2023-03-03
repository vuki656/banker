import {
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'
import { forwardRef } from 'react'

import type { SidebarButtonProps } from './SidebarButton.types'

export const SidebarButton = forwardRef<HTMLButtonElement, SidebarButtonProps>(function SidebarButton(props, ref) {
    const {
        color,
        icon,
        label, // eslint-disable-next-line @typescript-eslint/no-unused-vars
        selected = false,
        ...other
    } = props

    return (
        <UnstyledButton
            {...other}
            ref={ref}
            sx={(theme) => ({
                '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                },
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black,
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
})
