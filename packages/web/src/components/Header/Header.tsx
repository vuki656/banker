import {
    Group,
    Header as MantineHeader,
    Text,
} from '@mantine/core'

import type { HeaderProps } from './Header.types'

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
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
                style={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                }}
            >
                <Text weight="bold">
                    {title}
                </Text>
                {action}
            </Group>
        </MantineHeader>
    )
}
