import {
    Box,
    Stack,
} from '@mantine/core'
import type { FunctionComponent } from 'react'

import { HomeCategories } from './HomeCategories'
import { HomeHistoryChart } from './HomeHistoryChart'
import { HomeLatestTransactions } from './HomeLatestTransactions'
import { HomeTotal } from './HomeTotal'

export const Home: FunctionComponent = () => {
    return (
        <Box
            component={Stack}
            p="xl"
            sx={{
                display: 'grid',
                gridTemplateAreas: `
                    "total total"
                    "recent chart"
                    "recent categories"
                `,
                gridTemplateColumns: '1fr 1.7fr',
                gridTemplateRows: '130px 300px 1fr',
                height: '100%',
                overflow: 'hidden',
                width: '100%',
            }}
        >
            <HomeTotal />
            <HomeLatestTransactions />
            <HomeCategories />
            <HomeHistoryChart />
        </Box>
    )
}
