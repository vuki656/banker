import {
    Group,
    Header as MantineHeader,
    Text,
    useMantineTheme,
} from '@mantine/core'

import type { HeaderProps } from './Header.types'

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const {
        action,
        title,
    } = props

    const theme = useMantineTheme()

    return (
        <MantineHeader
            height={60}
            p="xs"
        >
            <Group
                position="apart"
                px={theme.spacing.md}
            >
                <Text weight="bold">
                    {title}
                </Text>
                {action}
            </Group>
        </MantineHeader>
    )
}
