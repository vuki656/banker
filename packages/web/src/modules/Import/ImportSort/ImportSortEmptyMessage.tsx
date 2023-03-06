import {
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { IconFileAnalytics } from '@tabler/icons-react'

export const ImportSortEmptyMessage: React.FunctionComponent = () => {
    return (
        <Stack
            align="center"
            spacing="xs"
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
        </Stack>
    )
}
