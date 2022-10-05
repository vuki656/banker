import {
    LoadingOverlay,
    Stack,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'

import { Header } from '../../components'
import type { CategoryType } from '../../graphql/types.generated'
import { useGetCategoriesQuery } from '../../graphql/types.generated'

import { Category } from './Category'
import { CategoryCreateDialog } from './CategoryCreateDialog'
import { CategoryUpdateDialog } from './CategoryUpdateDialog'

export const Categories: React.FunctionComponent = () => {
    const [dialogValue, setDialogValue] = useState<CategoryType | null>()

    const { data, loading, refetch } = useGetCategoriesQuery({
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to get categories',
                title: 'Error',
            })
        },
    })

    const onUpdate = () => {
        void refetch()

        setDialogValue(null)
    }

    const onCancel = () => {
        setDialogValue(null)
    }

    return (
        <>
            <Stack
                spacing={0}
                sx={{
                    flex: 1,
                    position: 'relative',
                }}

            >
                <LoadingOverlay visible={loading} />
                <Header
                    action={<CategoryCreateDialog onSubmit={refetch} />}
                    title="Categories"
                />
                <Stack
                    p="md"
                    sx={{ overflow: 'auto' }}
                >
                    {data?.categories.map((category) => {
                        return (
                            <Category
                                key={category.id}
                                onClick={() => {
                                    setDialogValue(category)
                                }}
                                value={category}
                            />
                        )
                    })}
                </Stack>
            </Stack>
            {dialogValue ? (
                <CategoryUpdateDialog
                    isOpen={Boolean(dialogValue)}
                    onCancel={onCancel}
                    onSubmit={onUpdate}
                    value={dialogValue}
                />
            ) : null}
        </>
    )
}
