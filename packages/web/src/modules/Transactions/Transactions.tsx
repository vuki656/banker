import {
    Group,
    Stack,
    Text,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import {
    Header,
    RangeSelect,
} from '../../components'
import type { TransactionType } from '../../graphql/types.generated'
import {
    useGetCategoriesQuery,
    useGetTransactionsQuery,
} from '../../graphql/types.generated'

import { useTransactionsStore } from './hooks'
import { Transaction } from './Transaction/Transaction'
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
                            <Transaction
                                key={transaction.id}
                                onClick={() => {
                                    setDialogValue(transaction)
                                }}
                                value={transaction}
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
