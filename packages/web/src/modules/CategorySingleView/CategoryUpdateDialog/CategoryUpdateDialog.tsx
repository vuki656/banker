import {
    Button,
    LoadingOverlay,
    Modal,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconPencil } from '@tabler/icons'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import type { CategoryFormType } from '../../../components'
import { CategoryForm } from '../../../components'
import {
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from '../../../graphql/types.generated'
import { useBoolean } from '../../../shared/hooks'
import { useCategoryStore } from '../hooks'

export const CategoryUpdateDialog = observer(() => {
    const router = useRouter()

    const store = useCategoryStore()

    const [isOpen, openActions] = useBoolean()

    const [updateCategoryMutation, { loading: updateLoading }] = useUpdateCategoryMutation({
        onCompleted: (data) => {
            showNotification({
                color: 'green',
                message: 'Category updated',
                title: 'Success',
            })

            store.setCategory(data.updateCategory.category)

            openActions.setFalse()
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

            openActions.setFalse()

            void router.push('/categories')
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to delete category',
                title: 'Error',
            })
        },
    })

    const onUpdate = (formValue: CategoryFormType) => {
        void updateCategoryMutation({
            variables: {
                input: {
                    color: formValue.color,
                    icon: formValue.icon,
                    id: store.category.id,
                    keywords: formValue.keywords,
                    name: formValue.name,
                },
            },
        })
    }

    const onDelete = () => {
        void deletedCategoryMutation({
            variables: {
                input: {
                    id: store.category.id,
                },
            },
        })
    }

    return (
        <>
            <Button
                leftIcon={<IconPencil size={16} />}
                onClick={openActions.setTrue}
                variant="light"
            >
                Update
            </Button>
            <Modal
                centered={true}
                onClose={openActions.setFalse}
                opened={isOpen}
                radius="md"
                size="lg"
                title="Update Category"
                withCloseButton={true}
            >
                <LoadingOverlay visible={deleteLoading || updateLoading} />
                <CategoryForm
                    onCancel={openActions.setFalse}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    value={store.category}
                />
            </Modal>
        </>
    )
})
