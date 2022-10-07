import {
    ActionIcon,
    Button,
    Modal,
    SimpleGrid,
    Stack,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons'
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
    const [value, setValue] = useState<number | undefined>()

    useEffect(() => {
        setValue(store.currentTransaction?.amount)
    }, [isOpen])

    const onCancel = () => {
        setValue(undefined)

        isOpenActions.setFalse()
    }

    const onSubmit = () => {
        if (!value) {
            return
        }

        store.currentTransactionAmount = value

        setValue(undefined)

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
                        onChange={setValue}
                        placeholder="Enter an amount"
                        value={value}
                    />
                    <SimpleGrid cols={2}>
                        <Button
                            onClick={onCancel}
                            variant="subtle"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!value}
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
