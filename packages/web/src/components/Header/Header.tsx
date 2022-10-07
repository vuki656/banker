import {
    Group,
    Header as MantineHeader,
    Text,
} from '@mantine/core'

import type { HeaderProps } from './Header.types'

export const Header = (props: HeaderProps) => {
    const {
        action,
        title,
    } = props

    return (
        <MantineHeader
            height={60}
            p="xs"
        >
            <Group
                position="apart"
                sx={(theme) => ({
                    padding: `0px ${theme.spacing.md}px`,
                })}
            >
                <Text weight="bold">
                    {title}
                </Text>
                {action}
            </Group>
        </MantineHeader>
    )
}
