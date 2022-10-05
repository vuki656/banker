import {
    Group,
    Highlight,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import { formatDate } from '../../../utils'
import { useImportStore } from '../hooks'

import { ImportSortEditAmountDialog } from './ImportSortEditAmountDialog'

export const ImportSortDetails = observer(() => {
    const store = useImportStore()

    return (
        <>
            <ThemeIcon
                color={store.currentTransaction?.category?.color}
                radius="xl"
                sx={{
                    height: '200px',
                    width: '200px',
                }}
                variant="filled"
            >
                <Icons
                    name={store.currentTransaction?.category?.icon}
                    size={100}
                />
            </ThemeIcon>
            <Text sx={{ fontSize: '40px' }}>
                {store.currentTransaction?.category?.name ?? 'N/A'}
            </Text>
            <Text
                align="center"
                color="dimmed"
                sx={{ maxWidth: '80%' }}
            >
                <Highlight highlight={store.currentTransactionMatchedKeyword}>
                    {store.currentTransaction?.description ?? 'N/A'}
                </Highlight>
            </Text>
            <Group>
                <Text
                    size="xl"
                    weight="bold"
                >
                    {store.currentTransaction?.amount}
                    {' '}
                    {store.currentTransaction?.currency}
                </Text>
                <ImportSortEditAmountDialog />
            </Group>
            <Text size="md">
                {formatDate(store.currentTransaction?.date)}
            </Text>
        </>
    )
})
