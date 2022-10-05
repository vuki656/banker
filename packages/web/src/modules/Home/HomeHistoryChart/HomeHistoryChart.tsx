import {
    Center,
    Paper,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { ResponsiveLine } from '@nivo/line'
import { IconTimeline } from '@tabler/icons'
import type { FunctionComponent } from 'react'

import {
    formatCurrency,
    useCurrentUser,
} from '../../../utils'
import { useHomeStore } from '../hooks'

export const HomeHistoryChart: FunctionComponent = () => {
    const { user } = useCurrentUser()

    const store = useHomeStore()

    return (
        <Paper
            p="md"
            shadow="xs"
            sx={{ gridArea: 'chart' }}
        >
            <Text weight="bold">
                Spent Per Day
            </Text>
            {store.expensesPerDay.list[0]?.data.length === 0 ? (
                <Center sx={{ height: '100%' }}>
                    <Stack
                        align="center"
                        spacing="xs"
                    >
                        <ThemeIcon
                            color="red"
                            size={35}
                            variant="light"
                        >
                            <IconTimeline size={25} />
                        </ThemeIcon>
                        <Text
                            color="dimmed"
                            size={15}
                        >
                            Add some transactions to see a visualization.
                        </Text>
                    </Stack>
                </Center>
            ) : (
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
                        tickValues: store.expensesPerDay.yAxisScale,
                    }}
                    curve="cardinal"
                    data={store.expensesPerDay.list}
                    enableArea={true}
                    margin={{ bottom: 70, left: 100, right: 30, top: 30 }}
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

            )}
        </Paper>
    )
}
