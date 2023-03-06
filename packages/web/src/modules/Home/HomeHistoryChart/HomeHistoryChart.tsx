import {
    Box,
    Paper,
    Text,
} from '@mantine/core'
import { ResponsiveLine } from '@nivo/line'
import { IconTimeline } from '@tabler/icons-react'
import type { FunctionComponent } from 'react'

import { Panel } from '../../../components'
import { useCurrentUser } from '../../../shared/auth'
import { formatCurrency } from '../../../shared/utils'
import { useHomeStore } from '../hooks'

export const HomeHistoryChart: FunctionComponent = () => {
    const { user } = useCurrentUser()

    const store = useHomeStore()

    return (
        <Panel
            isEmpty={store.expensesPerDay[0]?.data.length === 0}
            placeholder={{
                color: 'green',
                icon: <IconTimeline />,
                text: 'Add some transactions to see a visualization.',
            }}
            sx={{ gridArea: 'chart' }}
            title="History Per Day"

        >
            <Box sx={{ overflow: 'hidden' }}>
                <ResponsiveLine
                    axisBottom={{
                        legend: 'Days',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        format: (value) => {
                            return formatCurrency(Number(value), {
                                currency: user?.currency,
                                precision: 0,
                            })
                        },
                        legend: 'Amount',
                        legendOffset: -85,
                        legendPosition: 'middle',
                    }}
                    data={store.expensesPerDay}
                    enableArea={true}
                    margin={{
                        bottom: 45,
                        left: 100,
                        right: 30,
                        top: 0,
                    }}
                    tooltip={(input) => {
                        return (
                            <Paper shadow="xs">
                                <Text
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        padding: '3px 8px',
                                    }}
                                    weight="bold"
                                >
                                    {formatCurrency(Number(input.point.data.y.valueOf()), {
                                        currency: user?.currency,
                                    })}
                                </Text>
                            </Paper>
                        )
                    }}
                    useMesh={true}
                />
            </Box>
        </Panel>
    )
}
