import {
    Box,
    Stack,
} from '@mantine/core'

import { Header } from '../../components'
import { useBreakdownPageDataQuery } from '../../graphql/types.generated'

import { BreakdownBarChart } from './BreakdownBarChart'
import { BreakdownPieChart } from './BreakdownPieChart'
import { BreakdownRangeSelect } from './BreakdownRangeSelect'
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

    return (
        <Stack spacing={0}>
            <Header
                action={(
                    <BreakdownRangeSelect
                        loading={loading}
                        onSubmit={refetch}
                    />
                )}
                title="Breakdown"
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