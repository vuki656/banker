import {
    ActionIcon,
    Modal,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import type { FunctionComponent } from 'react'
import {
    useController,
    useFormContext,
} from 'react-hook-form'

import { useBoolean } from '../../../../shared/hooks'
import type { KeywordType } from '../../../../shared/types'
import type { CategoryFormType } from '../CategoryForm.types'
import { KeywordForm } from '../KeywordForm'

export const KeywordAddDialog: FunctionComponent = () => {
    const [isAddDialogOpen, addDialogActions] = useBoolean(false)

    const { control } = useFormContext<CategoryFormType>()

    const { field } = useController({ control, name: 'keywords' })

    const onKeywordAdd = (keyword: KeywordType) => {
        field.onChange([
            ...field.value,
            keyword,
        ])

        addDialogActions.setFalse()
    }

    return (
        <>
            <ActionIcon
                color="dark"
                onClick={addDialogActions.setTrue}
                size={30}
                variant="default"
            >
                <IconPlus />
            </ActionIcon>
            <Modal
                centered={true}
                onClose={addDialogActions.setFalse}
                opened={isAddDialogOpen}
                title="Add Keyword"
                zIndex={999}
            >
                <KeywordForm
                    onCancel={addDialogActions.setFalse}
                    onSubmit={onKeywordAdd}
                />
            </Modal>
        </>
    )
}
