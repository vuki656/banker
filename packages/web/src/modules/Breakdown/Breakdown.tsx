import { Box } from '@mantine/core'

import { BreakdownPieChart } from './BreakdownPieChart'
import { BreakdownSummary } from './BreakdownSummary'

export const Breakdown: React.FunctionComponent = () => {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                rowGap: '20px',
            }}
        >
            <BreakdownSummary />
            <BreakdownPieChart />
        </Box>
    )
}
