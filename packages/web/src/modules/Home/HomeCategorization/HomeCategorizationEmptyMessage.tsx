import {
    Box,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { IconFileAnalytics } from '@tabler/icons'

export const HomeCategorizationEmptyMessage: React.FunctionComponent = () => {
    return (
        <Box
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                rowGap: '10px',
            }}
        >
            <ThemeIcon
                color="green"
                size={40}
                variant="light"
            >
                <IconFileAnalytics size={25} />
            </ThemeIcon>
            <Text color="dimmed">
                Upload a bank statement to start
            </Text>
        </Box>
    )
}
