import { Header as MantineHeader } from '@mantine/core'

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
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 30px',
            }}
        >
            {title}
            {action}
        </MantineHeader>
    )
}
