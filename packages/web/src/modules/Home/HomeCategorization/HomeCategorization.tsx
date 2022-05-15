import {
    Box,
    Paper,
    Text,
} from '@mantine/core'
import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'

import { useHomeStore } from '../hooks'

export const HomeCategorization = observer(() => {
    const store = useHomeStore()

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                rowGap: '10px',
            }}
        >
            {store.transactions.map((transaction) => {
                return (
                    <Paper
                        key={transaction.id}
                        shadow="sm"
                        style={{
                            padding: '20px',
                        }}
                    >
                        <Text>
                            {transaction.amount}
                            {' '}
                            HRK
                        </Text>
                        <Text color="dimmed">
                            {transaction.description}
                        </Text>
                        <Text color="dimmed">
                            {format(transaction.date, 'dd/MM/yyyy')}
                        </Text>
                    </Paper>
                )
            })}
        </Box>
    )
})
