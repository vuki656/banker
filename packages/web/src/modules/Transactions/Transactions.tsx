import {
    Box,
    Group,
    Stack,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import {
    Header,
    Icons,
    RangeSelect,
} from '../../components'
import type { TransactionType } from '../../graphql/types.generated'
import {
    useGetCategoriesQuery,
    useGetTransactionsQuery,
} from '../../graphql/types.generated'

import { useTransactionsStore } from './hooks'
import { TransactionsCategorySelect } from './TransactionsCategorySelect'
import { TransactionsStatusSelect } from './TransactionStatusSelect'
import { TransactionUpdateDialog } from './TransactionUpdateDialog'

export const Transactions = observer(() => {
    const store = useTransactionsStore()

    const [dialogValue, setDialogValue] = useState<TransactionType | null>()

    useGetCategoriesQuery({
        onCompleted: (data) => {
            store.setCategories(data.categories)
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to get transactions',
                title: 'Error',
            })
        },
        ssr: false,
    })

    const { loading, refetch } = useGetTransactionsQuery({
        onCompleted: (data) => {
            store.setTransactions(data.transactions)
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to get transactions',
                title: 'Error',
            })
        },
        ssr: false,
        variables: {
            args: {
                endDate: store.range.endDate.toISOString(),
                startDate: store.range.startDate.toISOString(),
            },
        },
    })

    return (
        <>
            <Stack
                spacing={0}
                style={{
                    flex: 1,
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <Header
                    action={(
                        <RangeSelect
                            loading={loading}
                            onSubmit={store.setRange}
                            value={store.range}
                        />
                    )}
                    title={(
                        <Group>
                            <Text>
                                Transactions
                            </Text>
                        </Group>
                    )}
                />
                <TransactionsStatusSelect />
                <TransactionsCategorySelect />
                <Stack
                    p="md"
                    style={{
                        flex: 1,
                        overflow: 'auto',
                    }}
                >
                    {store.transactions.map((transaction) => {
                        return (
                            <UnstyledButton
                                key={transaction.id}
                                onClick={() => {
                                    setDialogValue(transaction)
                                }}
                            >
                                <Box
                                    sx={(theme) => ({
                                        alignItems: 'center',
                                        borderRadius: theme.radius.sm,
                                        boxShadow: theme.shadows.xs,
                                        columnGap: theme.spacing.md,
                                        display: 'grid',
                                        gridTemplateColumns: '0.2fr 0.2fr 0.1fr 0.5fr',
                                        padding: theme.spacing.xs,
                                    })}
                                >
                                    <Group>
                                        <ThemeIcon
                                            color={transaction.category?.color}
                                            size="md"
                                            variant="light"
                                        >
                                            <Icons
                                                name={transaction.category?.icon}
                                                size={21}
                                            />
                                        </ThemeIcon>
                                        <Text
                                            color={transaction.category?.color}
                                            size="sm"
                                            weight={500}
                                        >
                                            {transaction.category?.name}
                                        </Text>
                                    </Group>
                                    <Text size="sm">
                                        {dayjs(transaction.date).format('DD.MM.YYYY')}
                                    </Text>
                                    <Text
                                        size="sm"
                                        sx={(theme) => {
                                            let color = theme.colors.green

                                            if (transaction.amount >= 100) {
                                                color = theme.colors.orange
                                            }

                                            if (transaction.amount >= 500) {
                                                color = theme.colors.red
                                            }

                                            return {
                                                color,
                                            }
                                        }}
                                        weight="bold"
                                    >
                                        {`${transaction.amount} ${transaction.currency}`}
                                    </Text>
                                    <Text
                                        color="dimmed"
                                        size="sm"
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                        weight={500}
                                    >
                                        {transaction.description}
                                    </Text>
                                </Box>
                            </UnstyledButton>
                        )
                    })}
                </Stack>
            </Stack>
            {dialogValue ? (
                <TransactionUpdateDialog
                    isOpen={Boolean(dialogValue)}
                    onCancel={() => {
                        setDialogValue(null)
                    }}
                    onSubmit={() => {
                        void refetch()

                        setDialogValue(null)
                    }}
                    value={dialogValue}
                />
            ) : null}

        </>
    )
})
