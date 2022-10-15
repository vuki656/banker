import {
    LoadingOverlay,
    Stack,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'

import { Header } from '../../components'
import { useGetCategoriesQuery } from '../../graphql/types.generated'

import { Category } from './Category'
import { CategoryCreateDialog } from './CategoryCreateDialog'

export const CategoryListView: React.FunctionComponent = () => {
    const router = useRouter()

    const { data, loading, refetch } = useGetCategoriesQuery({
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to get categories',
                title: 'Error',
            })
        },
    })

    return (
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
                                void router.push(`/categories/${category.id}`)
                            }}
                            value={category}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
}
