import {
    Box,
    Navbar,
    Text,
    useMantineTheme,
} from '@mantine/core'
import { IconReportMoney } from '@tabler/icons'

import { SidebarButton } from '../SidebarButton'

export const Sidebar: React.FunctionComponent = () => {
    const theme = useMantineTheme()

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
                />
            </Navbar.Section>
        </Navbar>
    )
}
