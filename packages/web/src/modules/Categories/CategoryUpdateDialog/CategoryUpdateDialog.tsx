import { Modal } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import * as React from 'react'

import {
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from '../../../graphql/types.generated'
import type { CategoryFormType } from '../CategoryForm'
import { CategoryForm } from '../CategoryForm'

import type { CategoryUpdateDialogProps } from './CategoryUpdateDialog.types'

export const CategoryUpdateDialog: React.FunctionComponent<CategoryUpdateDialogProps> = (props) => {
    const {
        isOpen,
        onCancel,
        onSubmit: onSubmitProp,
        value,
    } = props

    const [updateCategoryMutation, { loading: updateLoading }] = useUpdateCategoryMutation({
        onCompleted: () => {
            showNotification({
                color: 'green',
                message: 'Category updated',
                title: 'Success',
            })

            onSubmitProp()
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to update category',
                title: 'Error',
            })
        },
    })

    const [deletedCategoryMutation, { loading: deleteLoading }] = useDeleteCategoryMutation({
        onCompleted: () => {
            showNotification({
                color: 'green',
                message: 'Category deleted',
                title: 'Success',
            })

            onSubmitProp()
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to delete category',
                title: 'Error',
            })
        },
    })

    const onSubmit = async (formValue: CategoryFormType) => {
        await updateCategoryMutation({
            variables: {
                input: {
                    color: formValue.color,
                    icon: formValue.icon,
                    id: value.id,
                    keywords: formValue.keywords,
                    name: formValue.name,
                },
            },
        })
    }

    const onDelete = async () => {
        await deletedCategoryMutation({
            variables: {
                input: {
                    id: value.id,
                },
            },
        })
    }

    return (
        <Modal
            centered={true}
            onClose={onCancel}
            opened={isOpen}
            radius="md"
            size="lg"
            title="Update Category"
            withCloseButton={true}
        >
            <CategoryForm
                loading={{
                    delete: deleteLoading,
                    update: updateLoading,
                }}
                onCancel={onCancel}
                onDelete={onDelete}
                onUpdate={onSubmit}
                value={value}
            />
        </Modal>
    )
}
