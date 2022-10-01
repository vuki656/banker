import {
    Chip,
    Group,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { useTransactionsStore } from '../hooks'

export const TransactionsCategorySelect = observer(() => {
    const store = useTransactionsStore()

    return (
        <Group
            spacing="xs"
            sx={(theme) => ({
                borderBottom: `1px solid ${theme.colors.gray[2]}`,
                padding: theme.spacing.sm,
            })}
        >
            <Chip
                checked={false}
                onClick={() => {
                    store.setCategoryFilter(null)
                }}
            >
                Clear
            </Chip>
            <Chip.Group
                multiple={false}
                onChange={(categoryId) => {
                    if (categoryId === store.categoryFilter) {
                        store.setCategoryFilter(null)

                        return
                    }

                    store.setCategoryFilter(categoryId)
                }}
                value={store.categoryFilter ?? ''}
            >
                {store.categories.map((category) => {
                    return (
                        <Chip
                            key={category.id}
                            sx={{
                                columnGap: '5px',
                                display: 'flex',
                                overflowX: 'auto',
                            }}
                            value={category.id}
                            variant="filled"
                        >
                            {category.name}
                        </Chip>
                    )
                })}
            </Chip.Group>
        </Group>
    )
})
