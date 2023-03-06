import {
    Group,
    Stack,
    Text,
} from '@mantine/core'
import { IconList } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'

import {
    HighlightedCurrency,
    Panel,
} from '../../../components'
import { formatDate } from '../../../shared/utils'
import { useCategoryStore } from '../hooks'

export const CategoryTransactions = observer(() => {
    const store = useCategoryStore()

    return (
        <Panel
            isEmpty={store.transactions.length === 0}
            placeholder={{
                color: 'orange',
                icon: <IconList />,
                text: 'No transactions',
            }}
            sx={{ gridArea: 'transactions' }}
            title="Transactions"
        >
            <Stack>
                {store.transactions.map((transaction) => {
                    return (
                        <Group
                            key={transaction.id}
                            spacing={30}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '100px 80px 1fr',
                                overflow: 'hidden',
                            }}
                        >
                            <HighlightedCurrency
                                amount={transaction.amount.converted}
                                high={100}
                                medium={70}
                            />
                            <Text
                                align="center"
                                size={14}
                                weight={500}
                            >
                                {formatDate(transaction.date)}
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
        </Panel>
    )
})
