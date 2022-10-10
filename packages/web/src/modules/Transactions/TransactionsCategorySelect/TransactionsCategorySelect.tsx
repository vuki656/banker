import { Select } from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { useTransactionsStore } from '../hooks'
import { TransactionCategorySelectItem } from '../TransactionCategorySelectItem'

export const TransactionsCategorySelect = observer(() => {
    const store = useTransactionsStore()

    return (
        <Select
            clearable={true}
            data={store.categorySelectItems}
            itemComponent={TransactionCategorySelectItem}
            maxDropdownHeight={400}
            nothingFound="No Category Found"
            onChange={(selectedCategory) => {
                store.setCategoryFilter(selectedCategory)
            }}
            placeholder="Pick a Category"
            searchable={true}
        />
    )
})
