import {
    Box,
    Paper,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import { useBreakdownStore } from '../hooks'

export const BreakdownSummary = observer(() => {
    const store = useBreakdownStore()

    return (
        <Box
            style={{
                display: 'grid',
                gap: '20px',
                gridArea: 'summary',
                gridTemplateColumns: 'repeat(6, 1fr)',
            }}
        >
            {Object.entries(store.summaryData).map(([categoryName, categoryValue]) => {
                return (
                    <Paper
                        key={categoryName}
                        shadow="xs"
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20px',
                            rowGap: '10px',
                        }}
                    >
                        <ThemeIcon
                            color={categoryValue.color}
                            size={70}
                            variant="light"
                        >
                            <Icons name={categoryValue.icon} />
                        </ThemeIcon>
                        <Text
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >
                            {categoryValue.name}
                        </Text>
                        <Text>
                            {categoryValue.amount.toFixed(2)}
                            {' '}
                            HRK
                        </Text>
                    </Paper>
                )
            })}
        </Box>
    )
})
