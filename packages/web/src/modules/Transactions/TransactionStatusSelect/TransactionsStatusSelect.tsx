import {
    Chip,
    Chips,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'

import { TransactionStatusEnum } from '../../../graphql/types.generated'
import { useTransactionsStore } from '../hooks'

export const TransactionsStatusSelect = observer(() => {
    const store = useTransactionsStore()

    return (
        <Chips
            onChange={(status) => {
                store.setStatus(status as TransactionStatusEnum)
            }}
            value={store.status}
            variant='filled'
            sx={(theme) => ({
                borderBottom: `1px solid ${theme.colors.gray[2]}`,
                padding: theme.spacing.sm,
            })}
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
