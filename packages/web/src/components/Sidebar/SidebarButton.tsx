import {
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'

import type { SidebarButtonProps } from './SidebarButton.types'

// TODO: add the selected background color capability
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
}
