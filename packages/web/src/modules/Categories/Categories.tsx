import { Stack } from '@mantine/core'
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

    const { data, refetch } = useGetCategoriesQuery({
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to get categories',
                title: 'Error',
            })
        },
    })

    return (
        <>
            <Stack
                spacing={0}
                style={{ flex: 1 }}
            >
                <Header
                    action={<CategoryCreateDialog onSubmit={refetch} />}
                    title="Categories"
                />
                <Stack
                    p="md"
                    style={{ overflow: 'auto' }}
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
                    onCancel={() => {
                        setDialogValue(null)
                    }}
                    onSubmit={() => {
                        void refetch()

                        setDialogValue(null)
                    }}
                    value={dialogValue}
                />
            ) : null}
        </>
    )
}
