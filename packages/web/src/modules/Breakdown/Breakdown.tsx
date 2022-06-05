import {
    Box,
    Stack,
} from '@mantine/core'

import { Header } from '../../components'

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
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    rowGap: '20px',
                }}
            >
                <BreakdownSummary />
                <BreakdownPieChart />
            </Box>
        </Stack>
    )
}
