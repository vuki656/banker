import {
    Highlight,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import { useHomeStore } from '../hooks'

export const HomeSortDetails = observer(() => {
    const store = useHomeStore()

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
            <Text
                size="xl"
                weight="bold"
            >
                {store.currentTransaction?.amount}
                {' '}
                {store.currentTransaction?.currency}
            </Text>
            <Text size="md">
                {format(store.currentTransaction?.date ?? new Date(), 'dd/MM/yyyy')}
            </Text>
        </>
    )
})
