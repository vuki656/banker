import {
    Center,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons'
import dayjs from 'dayjs'
import type { FunctionComponent } from 'react'

import { Icons } from '../../../components'
import { useCurrentUser } from '../../../shared/auth'
import { formatCurrency } from '../../../shared/utils'
import { useHomeStore } from '../hooks'

export const HomeLatestTransactions: FunctionComponent = () => {
    const { user } = useCurrentUser()

    const store = useHomeStore()

    return (
        <Paper
            p="md"
            shadow="xs"
            sx={{
                display: 'grid',
                gridArea: 'recent',
                gridTemplateRows: 'auto 1fr',
                overflow: 'auto',
            }}
        >
            <Text weight="bold">
                Recent Transactions
            </Text>
            <Stack
                align="center"
                justify={store.currentMonthTransactions.length === 0 ? 'center' : 'flex-start'}
                mt={30}
                spacing={30}
            >
                {store.currentMonthTransactions.length === 0 ? (
                    <Center>
                        <Stack
                            align="center"
                            spacing="xs"
                        >
                            <ThemeIcon
                                color="green"
                                size={35}
                                variant="light"
                            >
                                <IconCircleDashed size={25} />
                            </ThemeIcon>
                            <Text
                                color="dimmed"
                                size={15}
                            >
                                Nothing here yet. Add some transactions.
                            </Text>
                        </Stack>
                    </Center>
                ) : store.currentMonthTransactions.map((transaction) => {
                    return (
                        <Group
                            key={transaction.id}
                            spacing={20}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'auto 100px 50px 1fr',
                                overflow: 'hidden',
                            }}
                        >
                            <ThemeIcon
                                color={transaction.category?.color}
                                size={25}
                                variant="light"
                            >
                                <Icons name={transaction.category?.icon} />
                            </ThemeIcon>
                            <Text
                                align="right"
                                size={14}
                                weight={500}
                            >
                                {formatCurrency(transaction.amount.converted, { currency: user?.currency })}
                            </Text>
                            <Text
                                size={14}
                                weight={500}
                            >
                                {dayjs(transaction.date).format('DD.MM.YY')}
                            </Text>
                            <Text
                                color="gray.6"
                                size={14}
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                                weight={500}
                            >
                                {transaction.description}
                            </Text>
                        </Group>
                    )
                })}
            </Stack>
        </Paper>
    )
}
