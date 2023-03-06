import {
    Button,
    Modal,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons-react'

import { CategoryForm } from '../../../components'
import { useCreateCategoryMutation } from '../../../graphql/types.generated'
import { useBoolean } from '../../../shared/hooks'

import type {
    CategoryCreateDialogProps,
    CreateCategoryFormType,
} from './CategoryCreateDialog.types'

export const CategoryCreateDialog: React.FunctionComponent<CategoryCreateDialogProps> = (props) => {
    const { onSubmit: onSubmitProp } = props

    const [isOpen, openActions] = useBoolean()

    const [createCategoryMutation] = useCreateCategoryMutation({
        onCompleted: () => {
            showNotification({
                color: 'green',
                message: 'Category created',
                title: 'Success',
            })

            openActions.setFalse()

            onSubmitProp()
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to create category',
                title: 'Error',
            })
        },
    })

    const onSubmit = async (formValue: CreateCategoryFormType) => {
        await createCategoryMutation({
            variables: {
                input: {
                    color: formValue.color,
                    icon: formValue.icon,
                    keywords: formValue.keywords.map((keyword) => {
                        return keyword.name
                    }),
                    name: formValue.name,
                },
            },
        })
    }

    return (
        <>
            <Button
                leftIcon={<IconPlus size={16} />}
                onClick={openActions.setTrue}
            >
                Create
            </Button>
            <Modal
                centered={true}
                onClose={openActions.setFalse}
                opened={isOpen}
                size="lg"
                title="Create Category"
            >
                <CategoryForm
                    onCancel={openActions.setFalse}
                    onUpdate={onSubmit}
                />
            </Modal>
        </>
    )
}
