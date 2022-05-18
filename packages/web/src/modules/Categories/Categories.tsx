import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Paper,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import * as IconList from '@tabler/icons'

import { Header } from '../../components'
import type { CategoryType } from '../../graphql/types.generated'
import {
    useDeleteCategoryMutation,

    useGetCategoriesQuery,
    useUpdateCategoryMutation,
} from '../../graphql/types.generated'

import { CategoryForm } from './CategoryForm'
import { CreateCategory } from './CreateCategory'

const UPDATE_FORM_ID = 'update-category-form-id'

export const Categories: React.FunctionComponent = () => {
    const { closeModal, openConfirmModal, openModal } = useModals()

    const { data, refetch } = useGetCategoriesQuery({
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to get categories',
                title: 'Error',
            })
        },
    })

    const [updateCategoryMutation, { loading: updateLoading }] = useUpdateCategoryMutation({
        onCompleted: () => {
            showNotification({
                color: 'green',
                message: 'Category updated',
                title: 'Success',
            })

            void refetch()
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

                    await refetch()
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
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
        >
            <Header
                action={<CreateCategory onSubmit={refetch} />}
                title="Categories"
            />
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    rowGap: '10px',
                }}
            >
                {data?.categories.map((category) => {
                    const Icon = Object.values(IconList).find((icon) => {
                        return icon.name === category.icon
                    })

                    if (!Icon) {
                        throw new Error(`Category icon not found. ${category}`)
                    }

                    return (
                        <Paper
                            key={category.id}
                            shadow="xs"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                            }}
                        >
                            <Box
                                style={{
                                    alignItems: 'center',
                                    columnGap: '10px',
                                    display: 'flex',
                                }}
                            >
                                <ThemeIcon
                                    color={category.color}
                                    size="xl"
                                    variant="light"
                                >
                                    <Icon size={21} />
                                </ThemeIcon>
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        rowGap: '5px',
                                    }}
                                >
                                    <Text
                                        size="sm"
                                        weight={500}
                                    >
                                        {category.name}
                                    </Text>
                                    <Box
                                        style={{
                                            columnGap: '5px',
                                            display: 'flex',
                                        }}
                                    >
                                        {category.keywords.map((keyword) => {
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
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                style={{
                                    columnGap: '10px',
                                    display: 'flex',
                                }}
                            >
                                <ActionIcon
                                    onClick={onUpdate(category)}
                                    variant="outline"
                                >
                                    <IconList.IconPencil size={16} />
                                </ActionIcon>
                                <ActionIcon
                                    onClick={onDelete(category)}
                                    variant="outline"
                                >
                                    <IconList.IconTrash size={16} />
                                </ActionIcon>
                            </Box>
                        </Paper>
                    )
                })}
            </Box>
        </Box>
    )
}
