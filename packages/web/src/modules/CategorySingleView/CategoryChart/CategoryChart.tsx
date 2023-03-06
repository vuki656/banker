import {
    Box,
    Paper,
    Text,
} from '@mantine/core'
import { ResponsiveLine } from '@nivo/line'
import { IconChartLine } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'

import { Panel } from '../../../components'
import { useCurrentUser } from '../../../shared/auth'
import { formatCurrency } from '../../../shared/utils'
import { useCategoryStore } from '../hooks'

export const CategoryChart = observer(() => {
    const { user } = useCurrentUser()

    const store = useCategoryStore()

    return (
        <Panel
            isEmpty={store.transactions.length === 0}
            placeholder={{
                color: 'red',
                icon: <IconChartLine />,
                text: 'No transactions',
            }}
            title="History"
        >
            <Box sx={{ overflow: 'hidden' }}>
                <ResponsiveLine
                    axisBottom={{
                        tickRotation: -60,
                    }}
                    axisLeft={{
                        format: (value) => {
                            return formatCurrency(Number(value), {
                                currency: user?.currency,
                                precision: 0,
                            })
                        },
                        legendPosition: 'middle',
                        tickPadding: 20,
                        tickSize: 0,
                    }}
                    data={store.expensesPerDay}
                    enableArea={true}
                    margin={{
                        bottom: 60,
                        left: 90,
                        right: 30,
                        top: 10,
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
})
