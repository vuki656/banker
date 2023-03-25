import {
    ActionIcon,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import {
    IconArrowLeft,
    IconArrowRight,
    IconLineDashed,
    IconReceipt,
    IconTrendingDown,
    IconTrendingUp,
} from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import type { FunctionComponent } from 'react'

import { useCurrentUser } from '../../../shared/auth'
import {
    formatCurrency,
    formatDate,
} from '../../../shared/utils'
import { useHomeStore } from '../hooks'

export const HomeTotal: FunctionComponent = observer(() => {
    const store = useHomeStore()

    const { user } = useCurrentUser()

    return (
        <Group sx={{ gridArea: 'total' }}>
            <ActionIcon
                onClick={store.goToPreviousMonth}
                variant="default"
                sx={(theme) => ({
                    alignItems: 'center',
                    border: 'none',
                    boxShadow: theme.shadows.xs,
                    display: 'flex',
                    justifyContent: 'center',
                })}
            >
                <IconArrowLeft />
            </ActionIcon>
            <Paper
                p="md"
                shadow="xs"
                sx={{
                    flex: 1,
                }}
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
                                {`${formatDate(store.dateRange.start)} - ${formatDate(store.dateRange.end)}`}
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
            <ActionIcon
                onClick={store.goToNextMonth}
                variant="default"
                sx={(theme) => ({
                    alignItems: 'center',
                    border: 'none',
                    boxShadow: theme.shadows.xs,
                    display: 'flex',
                    justifyContent: 'center',
                })}
            >
                <IconArrowRight />
            </ActionIcon>
        </Group>
    )
})
