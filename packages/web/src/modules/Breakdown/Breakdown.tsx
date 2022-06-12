import {
    Badge,
    Box,
    Group,
    Stack,
    Text,
} from '@mantine/core'

import type { RangeSelectValue } from '../../components'
import {
    Header,
    RangeSelect,
} from '../../components'
import { useBreakdownPageDataQuery } from '../../graphql/types.generated'

import { BreakdownBarChart } from './BreakdownBarChart'
import { BreakdownPieChart } from './BreakdownPieChart'
import { BreakdownSummary } from './BreakdownSummary'
import { useBreakdownStore } from './hooks'

export const Breakdown: React.FunctionComponent = () => {
    const store = useBreakdownStore()

    const { loading, refetch } = useBreakdownPageDataQuery({
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            store.setCategories(data.categories)
            store.setTransactions(data.transactions)
        },
        ssr: false,
        variables: {
            transactionsArgs: {
                endDate: store.range.endDate.toISOString(),
                startDate: store.range.startDate.toISOString(),
            },
        },
    })

    const onRangeChange = (formValue: RangeSelectValue) => {
        store.setRange(formValue)

        void refetch()
    }

    return (
        <Stack
            spacing={0}
            style={{ flex: 1 }}
        >
            <Header
                action={(
                    <RangeSelect
                        loading={loading}
                        onSubmit={onRangeChange}
                        value={store.range}
                    />
                )}
                title={(
                    <Group>
                        <Text>
                            Breakdown
                        </Text>
                        <Badge>
                            {store.total}
                            {' '}
                            HRK
                        </Badge>
                    </Group>
                )}
            />
            <Box
                style={{
                    display: 'grid',
                    gap: '20px',
                    gridTemplateAreas: `
                        "summary summary"
                        "pie     bar"
                    `,
                    gridTemplateColumns: '300px 1fr',
                    gridTemplateRows: 'auto 1fr',
                    overflow: 'auto',
                    padding: '20px',
                }}
            >
                <BreakdownSummary />
                <BreakdownPieChart />
                <BreakdownBarChart />
            </Box>
        </Stack>
    )
}
