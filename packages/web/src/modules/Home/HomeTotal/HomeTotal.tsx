import {
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import {
    IconLineDashed,
    IconReceipt,
    IconTrendingDown,
    IconTrendingUp,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { FunctionComponent } from 'react'

import { useCurrentUser } from '../../../shared/auth'
import {
    formatCurrency,
    formatDate,
} from '../../../shared/utils'
import { useHomeStore } from '../hooks'

export const HomeTotal: FunctionComponent = () => {
    const store = useHomeStore()

    const { user } = useCurrentUser()

    // TODO: fix dates
    return (
        <Paper
            p="md"
            shadow="xs"
            sx={{ gridArea: 'total' }}
        >
            <Stack spacing="xs">
                <Group>
                    <ThemeIcon
                        color="blue.4"
                        size={70}
                        variant="light"
                    >
                        <IconReceipt />
                    </ThemeIcon>
                    <Stack spacing={0}>
                        <Text weight="bold">
                            Total
                        </Text>
                        <Text
                            color="gray.5"
                            size="xs"
                            weight={500}
                        >
                            {/* // eslint-disable-next-line newline-per-chained-call */}
                            {`
                                ${formatDate(dayjs().subtract(1, 'month')
            .startOf('month')
            .toDate())} -
                                ${formatDate(dayjs().subtract(1, 'month')
            .endOf('month')
            .toDate())}`}
                        </Text>
                        <Text
                            size="xl"
                            weight="bold"
                        >
                            {formatCurrency(store.focusedMonthTotal, { currency: user?.currency })}
                        </Text>
                    </Stack>
                </Group>
                {(() => {
                    if (store.difference === 0) {
                        return (
                            <Group>
                                <ThemeIcon
                                    color="gray"
                                    size={20}
                                    variant="light"
                                >
                                    <IconLineDashed />
                                </ThemeIcon>
                                <Text
                                    color="gray"
                                    size={14}
                                >
                                    No change
                                </Text>
                            </Group>
                        )
                    }

                    if (store.difference < 0) {
                        return (
                            <Group>
                                <ThemeIcon
                                    color="green"
                                    size={20}
                                    variant="light"
                                >
                                    <IconTrendingDown />
                                </ThemeIcon>
                                <Text
                                    color="green.7"
                                    size={14}
                                >
                                    {store.difference.toFixed(2).slice(1)}
                                    {' '}
                                    %
                                    less this month
                                </Text>
                            </Group>
                        )
                    }

                    return (
                        <Group>
                            <ThemeIcon
                                color="red"
                                size={20}
                                variant="light"
                            >
                                <IconTrendingUp />
                            </ThemeIcon>
                            <Text
                                color="red.7"
                                size={14}
                            >
                                {store.difference.toFixed(2)}
                                {' '}
                                %
                                more this month
                            </Text>
                        </Group>
                    )
                })()}
            </Stack>
        </Paper>
    )
}
