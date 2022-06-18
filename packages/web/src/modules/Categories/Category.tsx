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
import { useHover } from '@mantine/hooks'
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

export const Category: React.FunctionComponent<CategoryProps> = (props) => {
    const {
        onSubmit,
        value,
    } = props

    const { closeModal, openConfirmModal, openModal } = useModals()
    const { hovered, ref } = useHover()

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
        <Paper
            ref={ref}
            shadow="xs"
        >
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
                {hovered ? (
                    <Group spacing="xs">
                        <ActionIcon
                            color="blue"
                            onClick={onUpdate(value)}
                            variant="default"
                        >
                            <IconPencil size={16} />
                        </ActionIcon>
                        <ActionIcon
                            color="blue"
                            onClick={onDelete(value)}
                            variant="default"
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ) : null}
            </Group>
        </Paper>
    )
}
