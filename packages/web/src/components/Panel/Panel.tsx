import {
    Center,
    Paper,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import type { FunctionComponent } from 'react'

import type { PanelProps } from './Panel.types'

export const Panel: FunctionComponent<PanelProps> = (props) => {
    const {
        children,
        isEmpty,
        placeholder,
        sx,
        title,
        ...other
    } = props

    return (
        <Paper
            {...other}
            p="md"
            shadow="xs"
            sx={{
                display: 'grid',
                gridTemplateRows: '50px 1fr',
                overflow: 'auto',
                ...sx,
            }}
        >
            <Text
                mb={10}
                weight="bold"
            >
                {title}
            </Text>
            {isEmpty ? (
                <Center>
                    <Stack
                        align="center"
                        spacing="xs"
                    >
                        <ThemeIcon
                            color={placeholder?.color}
                            size={40}
                            variant="light"
                        >
                            {placeholder?.icon}
                        </ThemeIcon>
                        <Text
                            color="dimmed"
                            weight={500}
                        >
                            {placeholder?.text}
                        </Text>
                    </Stack>
                </Center>
            ) : children}
        </Paper>
    )
}
