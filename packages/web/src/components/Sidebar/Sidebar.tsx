import {
    Navbar,
    Text,
    useMantineTheme,
} from '@mantine/core'
import {
    IconChartBar,
    IconLogout,
    IconPackage,
    IconReportMoney,
} from '@tabler/icons'
import { removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'

import { COOKIE_TOKEN_NAME } from '../../utils'

import { SidebarButton } from './SidebarButton'

const ICON_SIZE = 16

export const Sidebar: React.FunctionComponent = () => {
    const theme = useMantineTheme()
    const router = useRouter()

    const onLogout = async () => {
        await router.push('/')

        removeCookies(COOKIE_TOKEN_NAME)
    }

    return (
        <Navbar
            height="100%"
            p="xs"
            width={{ base: 300 }}
        >
            <Navbar.Section mt="xs">
                <Text
                    style={{
                        borderBottom: `1px solid ${theme.colors.gray[2]}`,
                        fontSize: '30px',
                        fontWeight: 600,
                        paddingBottom: theme.spacing.lg,
                        paddingLeft: theme.spacing.xs,
                        paddingRight: theme.spacing.xs,
                    }}
                >
                    Banker
                </Text>
            </Navbar.Section>
            <Navbar.Section
                grow={true}
                mt="md"
            >
                <SidebarButton
                    color="blue"
                    icon={<IconReportMoney size={ICON_SIZE} />}
                    label="Home"
                    onClick={() => {
                        void router.push('/home')
                    }}
                    selected={router.pathname === '/home'}
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
                    icon={<IconLogout size={ICON_SIZE} />}
                    label="Logout"
                    onClick={onLogout}
                />
            </Navbar.Section>
        </Navbar>
    )
}
