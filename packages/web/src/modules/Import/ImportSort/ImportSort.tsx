import { Stack } from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { useImportStore } from '../hooks'

import { ImportSortButtons } from './ImportSortButtons'
import { ImportSortDetails } from './ImportSortDetails'
import { ImportSortEmptyMessage } from './ImportSortEmptyMessage'
import { ImportSortSelect } from './ImportSortSelect'

export const ImportSort = observer(() => {
    const store = useImportStore()

    return (
        <Stack
            align="center"
            justify="center"
            sx={{
                height: '100%',
                overflow: 'auto',
            }}
        >
            {store.currentTransaction ? (
                <Stack
                    align="center"
                    justify="center"
                >
                    <ImportSortDetails />
                    <ImportSortSelect />
                    <ImportSortButtons />
                </Stack>
            ) : <ImportSortEmptyMessage />}
        </Stack>
    )
})
