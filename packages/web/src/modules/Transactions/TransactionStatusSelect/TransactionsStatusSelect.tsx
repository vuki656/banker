import {
    Box,
    Center,
    SegmentedControl,
} from '@mantine/core'
import {
    IconCheck,
    IconClock,
    IconTrash,
} from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'

import { TransactionStatus } from '../../../graphql/types.generated'
import { toFirstCapitalCase } from '../../../shared/utils'
import { useTransactionsStore } from '../hooks'

export const TransactionsStatusSelect = observer(() => {
    const store = useTransactionsStore()

    return (
        <SegmentedControl
            data={[
                {
                    label: (
                        <Center>
                            <IconCheck size={16} />
                            <Box ml={10}>
                                {toFirstCapitalCase(TransactionStatus.Done)}
                            </Box>
                        </Center>
                    ),
                    value: TransactionStatus.Done,
                },
                {
                    label: (
                        <Center>
                            <IconClock size={16} />
                            <Box ml={10}>
                                {toFirstCapitalCase(TransactionStatus.Skipped)}
                            </Box>
                        </Center>
                    ),
                    value: TransactionStatus.Skipped,
                },
                {
                    label: (
                        <Center>
                            <IconTrash size={16} />
                            <Box ml={10}>
                                {toFirstCapitalCase(TransactionStatus.Discarded)}
                            </Box>
                        </Center>
                    ),
                    value: TransactionStatus.Discarded,
                },
            ]}
            onChange={(status: TransactionStatus) => {
                store.setStatusFilter(status)
            }}
            value={store.statusFilter}
        />
    )
})
