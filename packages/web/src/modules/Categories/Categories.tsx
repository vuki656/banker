import { Stack } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import { Header } from '../../components'
import { useGetCategoriesQuery } from '../../graphql/types.generated'

import { Category } from './Category'
import { CreateCategory } from './CreateCategory'

export const Categories: React.FunctionComponent = () => {
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
        <Stack spacing={0}>
            <Header
                action={<CreateCategory onSubmit={refetch} />}
                title="Categories"
            />
            <Stack
                sx={(theme) => ({
                    padding: theme.spacing.md,
                })}
            >
                {data?.categories.map((category) => {
                    return (
                        <Category
                            key={category.id}
                            onSubmit={refetch}
                            value={category}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
}
