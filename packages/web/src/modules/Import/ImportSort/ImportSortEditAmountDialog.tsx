import {
    ActionIcon,
    Button,
    Modal,
    SimpleGrid,
    Stack,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import {
    useEffect,
    useState,
} from 'react'

import { MoneyInput } from '../../../components'
import { useBoolean } from '../../../shared/hooks'
import { useImportStore } from '../hooks'

export const ImportSortEditAmountDialog = observer(() => {
    const store = useImportStore()

    const [isOpen, isOpenActions] = useBoolean()
    const [amount, setAmount] = useState<number | ''>()

    useEffect(() => {
        setAmount(store.currentTransaction?.amount)
    }, [isOpen])

    const onCancel = () => {
        setAmount(undefined)

        isOpenActions.setFalse()
    }

    const onSubmit = () => {
        if (!amount) {
            return
        }

        store.setCurrentTransactionAmount(amount)

        setAmount(undefined)

        isOpenActions.setFalse()
    }

    return (
        <>
            <ActionIcon
                onClick={isOpenActions.setTrue}
                variant="default"
            >
                <IconPencil size={17} />
            </ActionIcon>
            <Modal
                centered={true}
                onClose={isOpenActions.setFalse}
                opened={isOpen}
                title="Edit Amount"
            >
                <Stack>
                    <MoneyInput
                        label="Amount"
                        onChange={setAmount}
                        placeholder="Enter an amount"
                        value={amount}
                    />
                    <SimpleGrid cols={2}>
                        <Button
                            onClick={onCancel}
                            variant="subtle"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!amount}
                            onClick={onSubmit}
                        >
                            Save
                        </Button>
                    </SimpleGrid>
                </Stack>
            </Modal>
        </>
    )
})
