import {
    Button,
    Group,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
    IconClock,
    IconDeviceFloppy,
    IconTrash,
} from '@tabler/icons'
import { observer } from 'mobx-react-lite'

import {
    TransactionStatusEnum,
    useCreateTransactionMutation,
} from '../../../graphql/types.generated'
import { useHomeStore } from '../hooks'

export const HomeSortButtons = observer(() => {
    const store = useHomeStore()

    const [createTransactionMutation] = useCreateTransactionMutation({
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to create transaction',
                title: 'Error',
            })
        },
    })

    const onTransactionSave = async (status: TransactionStatusEnum) => {
        if (!store.currentTransaction) {
            throw new Error('No transaction to save')
        }

        await createTransactionMutation({
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
            .then(() => {
                store.setCurrentTransaction()
            })
    }

    const onSkipClick = () => {
        void onTransactionSave(TransactionStatusEnum.Skipped)
    }

    const onSaveClick = () => {
        void onTransactionSave(TransactionStatusEnum.Done)
    }

    const onDiscardClick = () => {
        void onTransactionSave(TransactionStatusEnum.Discarded)
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
                disabled={!store.currentTransaction?.category}
                leftIcon={<IconDeviceFloppy size={16} />}
                onClick={onSaveClick}
            >
                Save
            </Button>
        </Group>
    )
})
