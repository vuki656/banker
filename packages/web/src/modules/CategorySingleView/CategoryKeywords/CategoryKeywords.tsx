import {
    Stack,
    Text,
} from '@mantine/core'
import { IconLetterK } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'

import { Panel } from '../../../components'
import { toFirstCapitalCase } from '../../../shared/utils'
import { useCategoryStore } from '../hooks'

export const CategoryKeywords = observer(() => {
    const store = useCategoryStore()

    return (
        <Panel
            isEmpty={store.category.keywords.length === 0}
            placeholder={{
                color: 'green',
                icon: <IconLetterK />,
                text: 'No keywords',
            }}
            title="Keywords"
        >
            <Stack>
                {store.category.keywords.map((keyword) => {
                    return (
                        <Text key={keyword.id}>
                            {toFirstCapitalCase(keyword.name)}
                        </Text>
                    )
                })}
            </Stack>
        </Panel>
    )
})
