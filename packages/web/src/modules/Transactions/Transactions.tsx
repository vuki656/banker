import {
    Center,
    Group,
    LoadingOverlay,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconList } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import {
    Header,
    RangeSelect,
} from '../../components'
import { useGetTransactionsQuery } from '../../graphql/types.generated'
import type { TransactionType } from '../../shared/types'

import { useTransactionsStore } from './hooks'
import { Transaction } from './Transaction/Transaction'
import { TransactionsCategorySelect } from './TransactionsCategorySelect'
import { TransactionsStatusSelect } from './TransactionStatusSelect'
import { TransactionUpdateDialog } from './TransactionUpdateDialog'

export const Transactions = observer(() => {
    const store = useTransactionsStore()

    const [dialogValue, setDialogValue] = useState<TransactionType | null>()

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
                sx={{
                    flex: 1,
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <LoadingOverlay visible={loading} />
                <Header
                    action={(
                        <RangeSelect
                            onSubmit={store.setRange}
                            range={store.range}
                        />
                    )}
                    title={(
                        <Text>
                            Transactions
                        </Text>
                    )}
                />
                <Group
                    sx={(theme) => ({
                        borderBottom: `1px solid ${theme.colors.gray[2]}`,
                        padding: theme.spacing.sm,
                    })}
                >
                    <TransactionsStatusSelect />
                    <TransactionsCategorySelect />
                </Group>
                <Stack
                    p="md"
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                    }}
                >
                    {store.transactions.length === 0 ? (
                        <Center sx={{ height: '100%', width: '100%' }}>
                            <Stack
                                align="center"
                                spacing="xs"
                            >
                                <ThemeIcon
                                    color="red"
                                    size={40}
                                    variant="light"
                                >
                                    <IconList size={25} />
                                </ThemeIcon>
                                <Text color="dimmed">
                                    No transactions. Select a different range.
                                </Text>
                            </Stack>
                        </Center>
                    ) : store.transactions.map((transaction) => {
                        return (
                            <Transaction
                                key={transaction.id}
                                onClick={() => {
                                    setDialogValue(transaction)
                                }}
                                transaction={transaction}
                            />
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
