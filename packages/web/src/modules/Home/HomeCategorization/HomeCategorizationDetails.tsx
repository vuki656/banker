import {
    Highlight,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import { useHomeStore } from '../hooks'

export const HomeCategorizationDetails = observer(() => {
    const store = useHomeStore()

    return (
        <>
            <ThemeIcon
                color={store.currentTransaction?.category?.color}
                radius="xl"
                size="xl"
                style={{
                    height: '300px',
                    marginBottom: '20px',
                    width: '300px',
                }}
                variant="filled"
            >
                <Icons
                    name={store.currentTransaction?.category?.icon}
                    size={200}
                />
            </ThemeIcon>
            <Text style={{ fontSize: '40px' }}>
                {store.currentTransaction?.category?.name ?? 'N/A'}
            </Text>
            <Text
                color="dimmed"
                style={{
                    fontSize: '20px',
                    maxWidth: '80%',
                    textAlign: 'center',
                }}
            >
                <Highlight highlight={store.currentTransaction?.keyword ?? ''}>
                    {store.currentTransaction?.description ?? 'N/A'}
                </Highlight>
            </Text>
            <Text
                style={{ fontSize: '20px' }}
                weight="bold"
            >
                {store.currentTransaction?.amount}
                {' '}
                {store.currentTransaction?.currency}
            </Text>
            <Text style={{ fontSize: '18px' }}>
                {format(store.currentTransaction?.date ?? new Date(), 'dd/MM/yyyy')}
            </Text>
        </>
    )
})
