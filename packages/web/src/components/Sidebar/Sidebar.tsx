import { useApolloClient } from '@apollo/client'
import {
    ActionIcon,
    Group,
    Navbar,
    Text,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core'
import {
    IconChartBar,
    IconList,
    IconLogout,
    IconMoon,
    IconPackage,
    IconSun,
    IconUpload,
} from '@tabler/icons'
import { removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'

import { COOKIE_TOKEN_NAME } from '../../utils'

import { SidebarButton } from './SidebarButton'

const ICON_SIZE = 16

export const Sidebar: React.FunctionComponent = () => {
    const theme = useMantineTheme()
    const router = useRouter()
    const apolloClient = useApolloClient()

    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    const onLogout = async () => {
        await router.push('/')

        await apolloClient.clearStore()

        removeCookies(COOKIE_TOKEN_NAME)
    }

    return (
        <Navbar
            height="100%"
            p="xs"
            style={{
                minWidth: '240px',
            }}
            width={{ base: 300 }}
        >
            <Navbar.Section mt="xs">
                <Group
                    align="center"
                    position="apart"
                    style={{
                        borderBottom: `1px solid ${theme.colors.gray[2]}`,
                        paddingBottom: theme.spacing.lg,
                        paddingLeft: theme.spacing.xs,
                        paddingRight: theme.spacing.xs,
                    }}
                >
                    <Text
                        style={{
                            fontSize: '30px',
                            fontWeight: 600,
                        }}
                    >
                        Banker
                    </Text>
                    <ActionIcon
                        color={colorScheme === 'dark' ? 'yellow' : 'blue'}
                        onClick={() => {
                            toggleColorScheme()
                        }}
                        title="Toggle color scheme"
                        variant="outline"
                    >
                        {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
                    </ActionIcon>
                </Group>
            </Navbar.Section>
            <Navbar.Section
                grow={true}
                mt="md"
            >
                <SidebarButton
                    color="blue"
                    icon={<IconUpload size={ICON_SIZE} />}
                    label="Import"
                    onClick={() => {
                        void router.push('/import')
                    }}
                    selected={router.pathname === '/import'}
                />
                <SidebarButton
                    color="orange"
                    icon={<IconPackage size={ICON_SIZE} />}
                    label="Categories"
                    onClick={() => {
                        void router.push('/categories')
                    }}
                    selected={router.pathname.startsWith('/categories')}
                />
                <SidebarButton
                    color="green"
                    icon={<IconChartBar size={ICON_SIZE} />}
                    label="Breakdown"
                    onClick={() => {
                        void router.push('/breakdown')
                    }}
                    selected={router.pathname.startsWith('/breakdown')}
                />
                <SidebarButton
                    color="red"
                    icon={<IconList size={ICON_SIZE} />}
                    label="Transactions"
                    onClick={() => {
                        void router.push('/transactions')
                    }}
                    selected={router.pathname.startsWith('/transactions')}
                />
            </Navbar.Section>
            <Navbar.Section>
                <SidebarButton
                    color="red"
                    icon={<IconLogout size={ICON_SIZE} />}
                    label="Logout"
                    onClick={onLogout}
                />
            </Navbar.Section>
        </Navbar>
    )
}
