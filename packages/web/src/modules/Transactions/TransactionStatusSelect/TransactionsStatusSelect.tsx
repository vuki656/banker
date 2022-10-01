import {
    Box,
    Center,
    SegmentedControl,
} from '@mantine/core'
import {
    IconCheck,
    IconClock,
    IconTrash,
} from '@tabler/icons'
import { observer } from 'mobx-react-lite'

import { TransactionStatusEnum } from '../../../graphql/types.generated'
import { toFirstCapitalCase } from '../../../utils'
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
                                {toFirstCapitalCase(TransactionStatusEnum.Done)}
                            </Box>
                        </Center>
                    ),
                    value: TransactionStatusEnum.Done,
                },
                {
                    label: (
                        <Center>
                            <IconClock size={16} />
                            <Box ml={10}>
                                {toFirstCapitalCase(TransactionStatusEnum.Skipped)}
                            </Box>
                        </Center>
                    ),
                    value: TransactionStatusEnum.Skipped,
                },
                {
                    label: (
                        <Center>
                            <IconTrash size={16} />
                            <Box ml={10}>
                                {toFirstCapitalCase(TransactionStatusEnum.Discarded)}
                            </Box>
                        </Center>
                    ),
                    value: TransactionStatusEnum.Discarded,
                },
            ]}
            onChange={(status: TransactionStatusEnum) => {
                store.statusFilter(status)
            }}
            value={store.statusFilter}
        />
    )
})
