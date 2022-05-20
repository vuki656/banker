import { Stack } from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { useHomeStore } from '../hooks'

import { HomeSortButtons } from './HomeSortButtons'
import { HomeSortDetails } from './HomeSortDetails'
import { HomeSortEmptyMessage } from './HomeSortEmptyMessage'
import { HomeSortSelect } from './HomeSortSelect'

export const HomeSort = observer(() => {
    const store = useHomeStore()

    return (
        <Stack
            align="center"
            justify="center"
            style={{ height: '100%', overflow: 'auto' }}
        >
            {store.currentTransaction ? (
                <Stack
                    align="center"
                    justify="center"
                >
                    <HomeSortDetails />
                    <HomeSortSelect />
                    <HomeSortButtons />
                </Stack>
            ) : <HomeSortEmptyMessage />}
        </Stack>
    )
})
