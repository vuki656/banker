import {
    Box,
    Navbar,
    Text,
    useMantineTheme,
} from '@mantine/core'
import {
    IconLogout,
    IconPackage,
    IconReportMoney,
} from '@tabler/icons'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { COOKIE_TOKEN_NAME } from '../../utils'
import { SidebarButton } from '../SidebarButton'

export const Sidebar: React.FunctionComponent = () => {
    const theme = useMantineTheme()
    const router = useRouter()

    const onLogout = async () => {
        await router.push('/')

        Cookies.remove(COOKIE_TOKEN_NAME)
    }

    return (
        <Navbar
            p="xs"
            width={{ base: 300 }}
        >
            <Navbar.Section mt="xs">
                <Box
                    sx={{
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
                </Box>
            </Navbar.Section>
            <Navbar.Section
                grow={true}
                mt="md"
            >
                <SidebarButton
                    color="blue"
                    icon={<IconReportMoney size={16} />}
                    label="Home"
                    onClick={() => {
                        void router.push('/home')
                    }}
                    selected={router.pathname === '/home'}
                />
                <SidebarButton
                    color="orange"
                    icon={<IconPackage size={16} />}
                    label="Categories"
                    onClick={() => {
                        void router.push('/categories')
                    }}
                    selected={router.pathname.startsWith('/categories')}
                />
                <SidebarButton
                    color="red"
                    icon={<IconLogout size={16} />}
                    label="Logout"
                    onClick={onLogout}
                />
            </Navbar.Section>
        </Navbar>
    )
}
