import {
    Button,
    Group,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
    IconClock,
    IconDeviceFloppy,
    IconTrash,
} from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'

import {
    TransactionStatusEnum,
    useCreateTransactionMutation,
} from '../../../graphql/types.generated'
import { useImportStore } from '../hooks'

export const ImportSortButtons = observer(() => {
    const store = useImportStore()

    const [createTransactionMutation] = useCreateTransactionMutation({
        onCompleted: () => {
            store.setNextTransaction()
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to create transaction',
                title: 'Error',
            })
        },
    })

    const onTransactionSave = (status: TransactionStatusEnum) => {
        if (!store.currentTransaction?.category && status === TransactionStatusEnum.Done) {
            showNotification({
                color: 'red',
                message: 'No category selected for transaction',
                title: 'Error',
            })

            return
        }

        if (!store.currentTransaction) {
            showNotification({
                color: 'red',
                message: 'No transaction to save',
                title: 'Error',
            })

            return
        }

        void createTransactionMutation({
            variables: {
                input: {
                    amount: store.currentTransaction.amount,
                    categoryId: store.currentTransaction.category?.id,
                    currency: store.currentTransaction.currency,
                    date: store.currentTransaction.date.toISOString(),
                    description: store.currentTransaction.description,
                    reference: store.currentTransaction.reference,
                    status,
                },
            },
        })
    }

    const onSkipClick = () => {
        onTransactionSave(TransactionStatusEnum.Skipped)
    }

    const onSaveClick = () => {
        onTransactionSave(TransactionStatusEnum.Done)
    }

    const onDiscardClick = () => {
        onTransactionSave(TransactionStatusEnum.Discarded)
    }

    return (
        <Group>
            <Button
                color="orange"
                leftIcon={<IconClock size={16} />}
                onClick={onSkipClick}
            >
                Skip
            </Button>
            <Button
                color="red"
                leftIcon={<IconTrash size={16} />}
                onClick={onDiscardClick}
            >
                Discard
            </Button>
            <Button
                color="green"
                disabled={!store.isCurrentTransactionSetup}
                leftIcon={<IconDeviceFloppy size={16} />}
                onClick={onSaveClick}
            >
                Save
            </Button>
        </Group>
    )
})
