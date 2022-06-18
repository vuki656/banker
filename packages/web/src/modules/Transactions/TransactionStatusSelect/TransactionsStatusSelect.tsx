import {
    Chip,
    Chips,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { TransactionStatusEnum } from '../../../graphql/types.generated'
import { useTransactionsStore } from '../hooks'

export const TransactionsStatusSelect = observer(() => {
    const store = useTransactionsStore()

    return (
        <Chips
            onChange={(status) => {
                store.setStatusFilter(status as TransactionStatusEnum)
            }}
            sx={(theme) => ({
                borderBottom: `1px solid ${theme.colors.gray[2]}`,
                padding: theme.spacing.sm,
            })}
            value={store.statusFilter}
            variant="filled"
        >
            <Chip value={TransactionStatusEnum.Done}>
                Done
            </Chip>
            <Chip value={TransactionStatusEnum.Skipped}>
                Skipped
            </Chip>
            <Chip value={TransactionStatusEnum.Discarded}>
                Discarded
            </Chip>
        </Chips>
    )
})
