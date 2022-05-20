import {
    ActionIcon,
    Badge,
    Button,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import {
    IconPencil,
    IconTrash,
} from '@tabler/icons'

import { Icons } from '../../components'
import type { CategoryType } from '../../graphql/types.generated'
import {
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from '../../graphql/types.generated'

import type { CategoryProps } from './Category.types'
import { CategoryForm } from './CategoryForm'

const UPDATE_FORM_ID = 'update-category-form-id'

export const Category: React.FunctionComponent<CategoryProps> = (props) => {
    const {
        onSubmit,
        value,
    } = props

    const { closeModal, openConfirmModal, openModal } = useModals()

    const [updateCategoryMutation, { loading: updateLoading }] = useUpdateCategoryMutation({
        onCompleted: () => {
            showNotification({
                color: 'green',
                message: 'Category updated',
                title: 'Success',
            })

            void onSubmit()
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
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to delete category',
                title: 'Error',
            })
        },
    })

    const onDelete = (category: CategoryType) => {
        return () => {
            openConfirmModal({
                cancelProps: {
                    loading: deleteLoading,
                },
                centered: true,
                confirmProps: { color: 'red' },
                labels: {
                    cancel: 'Cancel',
                    confirm: 'Delete',
                },
                onConfirm: async () => {
                    await deletedCategoryMutation({
                        variables: {
                            input: {
                                id: category.id,
                            },
                        },
                    })

                    await onSubmit()
                },
                title: `Delete ${category.name}`,
            })
        }
    }

    const onUpdate = (category: CategoryType) => {
        return () => {
            const id = openModal({
                centered: true,
                children: (
                    <CategoryForm
                        formId={UPDATE_FORM_ID}
                        loading={updateLoading}
                        onSubmit={async (formValue) => {
                            await updateCategoryMutation({
                                variables: {
                                    input: {
                                        color: formValue.color,
                                        icon: formValue.icon,
                                        id: category.id,
                                        keywords: formValue.keywords,
                                        name: formValue.name,
                                    },
                                },
                            })

                            closeModal(id)
                        }}
                        submitButton={(
                            <Button
                                id={UPDATE_FORM_ID}
                                loading={updateLoading}
                                type="submit"
                            >
                                Update
                            </Button>
                        )}
                        value={category}
                    />
                ),
                size: 'lg',
                title: 'Update Category',
                zIndex: 250,
            })
        }
    }

    return (
        <Paper shadow="xs">
            <Group
                p="sm"
                position="apart"
            >
                <Group>
                    <ThemeIcon
                        color={value.color}
                        size="xl"
                        variant="light"
                    >
                        <Icons
                            name={value.icon}
                            size={21}
                        />
                    </ThemeIcon>
                    <Stack spacing={3}>
                        <Text
                            size="sm"
                            weight={500}
                        >
                            {value.name}
                        </Text>
                        <Group spacing="xs">
                            {value.keywords.map((keyword) => {
                                return (
                                    <Badge
                                        color="gray"
                                        key={keyword.id}
                                        size="xs"
                                    >
                                        {keyword.name}
                                    </Badge>
                                )
                            })}
                        </Group>
                    </Stack>
                </Group>
                <Group spacing="xs">
                    <ActionIcon
                        onClick={onUpdate(value)}
                        variant="outline"
                    >
                        <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={onDelete(value)}
                        variant="outline"
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            </Group>
        </Paper>
    )
}
