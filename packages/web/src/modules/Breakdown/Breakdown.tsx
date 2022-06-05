import {
    Box,
    Stack,
} from '@mantine/core'

import { Header } from '../../components'

import { BreakdownBarChart } from './BreakdownBarChart'
import { BreakdownPieChart } from './BreakdownPieChart'
import { BreakdownRangeSelect } from './BreakdownRangeSelect'
import { BreakdownSummary } from './BreakdownSummary'

export const Breakdown: React.FunctionComponent = () => {
    return (
        <Stack spacing={0}>
            <Header
                action={<BreakdownRangeSelect />}
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
