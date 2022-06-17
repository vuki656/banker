import {
    Group,
    Highlight,
    Text,
    ThemeIcon,
} from '@mantine/core'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import { useImportStore } from '../hooks'

import { ImportSortEditAmountDialog } from './ImportSortEditAmountDialog'

export const ImportSortDetails = observer(() => {
    const store = useImportStore()

    return (
        <>
            <ThemeIcon
                color={store.currentTransaction?.category?.color}
                radius="xl"
                style={{
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
            <Text style={{ fontSize: '40px' }}>
                {store.currentTransaction?.category?.name ?? 'N/A'}
            </Text>
            <Text
                align="center"
                color="dimmed"
                style={{ maxWidth: '80%' }}
            >
                <Highlight highlight={store.currentTransaction?.keyword ?? ''}>
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
                <ImportSortEditAmountDialog
                    onSubmit={store.updateTransactionAmount}
                    value={store.currentTransaction?.amount}
                />
            </Group>
            <Text size="md">
                {dayjs(store.currentTransaction?.date).format('DD.MM.YYYY')}
            </Text>
        </>
    )
})
