import {
    Chip,
    Chips,
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
                color="red"
                onClick={() => {
                    store.setCategoryFilter(null)
                }}
                variant="filled"
            >
                Clear
            </Chip>
            <Chips
                multiple={false}
                onChange={(categoryId) => {
                    if (categoryId === store.categoryFilter) {
                        store.setCategoryFilter(null)

                        return
                    }

                    store.setCategoryFilter(categoryId)
                }}
                value={store.categoryFilter ?? ''}
                variant="filled"
            >
                {store.categories.map((category) => {
                    return (
                        <Chip
                            key={category.id}
                            style={{
                                columnGap: '5px',
                                display: 'flex',
                                overflowX: 'auto',
                            }}
                            value={category.id}
                        >
                            {category.name}
                        </Chip>
                    )
                })}
            </Chips>
        </Group>
    )
})
