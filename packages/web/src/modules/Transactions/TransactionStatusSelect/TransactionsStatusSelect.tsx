import { Chip } from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { TransactionStatusEnum } from '../../../graphql/types.generated'
import { useTransactionsStore } from '../hooks'

export const TransactionsStatusSelect = observer(() => {
    const store = useTransactionsStore()

    return (
        <Chip.Group
            onChange={(status) => {
                store.setStatusFilter(status as TransactionStatusEnum)
            }}
            sx={(theme) => ({
                borderBottom: `1px solid ${theme.colors.gray[2]}`,
                padding: theme.spacing.sm,
            })}
            value={store.statusFilter}
        >
            {Object.values(TransactionStatusEnum).map((name) => {
                return (
                    <Chip
                        key={name}
                        value={name}
                        variant="filled"
                    >
                        {name}
                    </Chip>
                )
            })}
        </Chip.Group>
    )
})
