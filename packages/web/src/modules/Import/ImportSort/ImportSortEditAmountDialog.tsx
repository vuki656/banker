import {
    ActionIcon,
    Button,
    Modal,
    SimpleGrid,
    Stack,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons'
import {
    useEffect,
    useState,
} from 'react'

import { MoneyInput } from '../../../components'
import { useBoolean } from '../../../utils'

import type { ImportSortEditAmountDialogProps } from './ImportSortEditAmountDialog.types'

export const ImportSortEditAmountDialog: React.FunctionComponent<ImportSortEditAmountDialogProps> = (props) => {
    const {
        onSubmit: onSubmitProp,
        value: valueProp,
    } = props

    const [isOpen, isOpenActions] = useBoolean()
    const [value, setValue] = useState<number | undefined>(valueProp)

    useEffect(() => {
        setValue(valueProp)
    }, [isOpen])

    const onCancel = () => {
        setValue(undefined)

        isOpenActions.setFalse()
    }

    const onSubmit = () => {
        if (!value) {
            return
        }

        onSubmitProp(value)

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
}
