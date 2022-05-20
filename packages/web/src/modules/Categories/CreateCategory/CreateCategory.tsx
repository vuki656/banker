import {
    Button,
    Modal,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons'
import * as React from 'react'

import { useCreateCategoryMutation } from '../../../graphql/types.generated'
import { useBoolean } from '../../../utils'
import { CategoryForm } from '../CategoryForm'

import type {
    CreateCategoryFormValueType,
    CreateCategoryProps,
} from './CreateCategory.types'

const FORM_ID = 'create-category-form-id'

export const CreateCategory: React.FunctionComponent<CreateCategoryProps> = (props) => {
    const { onSubmit: onSubmitProp } = props

    const [isOpen, openActions] = useBoolean()

    const [createCategoryMutation, { loading }] = useCreateCategoryMutation({
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

    const onSubmit = async (formValue: CreateCategoryFormValueType) => {
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
                    formId={FORM_ID}
                    loading={loading}
                    onSubmit={onSubmit}
                    submitButton={(
                        <Button
                            form={FORM_ID}
                            type="submit"
                        >
                            Create
                        </Button>
                    )}
                />
            </Modal>
        </>
    )
}
