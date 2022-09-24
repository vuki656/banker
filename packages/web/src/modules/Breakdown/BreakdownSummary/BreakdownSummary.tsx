import {
    Box,
    Paper,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import { useCurrentUser } from '../../../utils'
import { formatCurrency } from '../../../utils/formatCurrency'
import { useBreakdownStore } from '../hooks'

export const BreakdownSummary = observer(() => {
    const { user } = useCurrentUser()

    const store = useBreakdownStore()

    return (
        <Box
            sx={{
                display: 'grid',
                gap: '20px',
                gridArea: 'summary',
                gridTemplateColumns: 'repeat(8, 1fr)',
            }}
        >
            {store.summaryData.map((category) => {
                return (
                    <Paper
                        key={category.id}
                        shadow="xs"
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20px',
                            rowGap: '10px',
                        }}
                    >
                        <ThemeIcon
                            color={category.color}
                            size={70}
                            variant="light"
                        >
                            <Icons name={category.icon} />
                        </ThemeIcon>
                        <Text
                            sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >
                            {category.name}
                        </Text>
                        <Text>
                            {formatCurrency(category.total, user?.currency)}
                        </Text>
                    </Paper>
                )
            })}
        </Box>
    )
})
