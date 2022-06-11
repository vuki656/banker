import {
    Group,
    Stack,
    Text,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { observer } from 'mobx-react-lite'

import {
    Header,
    RangeSelect,
} from '../../components'
import { useGetTransactionsQuery } from '../../graphql/types.generated'

import { useTransactionsStore } from './hooks/useTransactionsStore'
import { Transaction } from './Transaction'

export const Transactions = observer(() => {
    const store = useTransactionsStore()

    const { loading } = useGetTransactionsQuery({
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
                            transaction={transaction}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
})
