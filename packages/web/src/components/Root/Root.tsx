import { AppShell } from '@mantine/core'

import { Sidebar } from '../Sidebar'

import type { RootProps } from './Root.types'

export const Root: React.FunctionComponent<RootProps> = (props) => {
    const { children } = props

    return (

        <AppShell
            navbar={<Sidebar />}
            padding="md"
            styles={(theme) => ({
                body: {
                    height: '100%',
                },
                main: {
                    display: 'flex',
                    flex: 1,
                    main: {
                        backgroundColor: theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                    },
                    overflowX: 'hidden',
                    padding: 0,
                    zIndex: 1,
                },
                root: {
                    height: '100%',
                },
            })}
        >
            {children}
        </AppShell>
    )
}
