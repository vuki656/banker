import {
    Box,
    Stack,
} from '@mantine/core'
import type { FunctionComponent } from 'react'

import { HomeCategories } from './HomeCategories'
import { HomeHistoryChart } from './HomeHistoryChart'
import { HomeLatestTransactions } from './HomeLatestTransactions'
import { HomeTotal } from './HomeTotal'
import { useHomeStore } from './hooks'
import { useGetTransactionsQuery } from '../../graphql/types.generated'

export const Home: FunctionComponent = () => {
    const store = useHomeStore()

    useGetTransactionsQuery({
        variables: {
            args: {
                startDate: store
                    .dateRange
                    .start
                    .toISOString(),
                endDate: store
                    .dateRange
                    .end
                    .toISOString(),
            }
        },
        onCompleted: (data) => {
            store.setTransactions(data.transactions)
        }
    })

    return (
        <Box
            component={Stack}
            sx={(theme) => ({
                display: 'grid',
                gap: theme.spacing.xl,
                gridTemplateAreas: `
                    "total total"
                    "recent chart"
                    "recent categories"
                `,
                gridTemplateColumns: '1fr 1.3fr',
                gridTemplateRows: '130px 300px 1fr',
                height: '100%',
                overflow: 'hidden',
                padding: theme.spacing.xl,
                width: '100%',
            })}
        >
            <HomeTotal />
            <HomeLatestTransactions />
            <HomeCategories />
            <HomeHistoryChart />
        </Box>
    )
}
