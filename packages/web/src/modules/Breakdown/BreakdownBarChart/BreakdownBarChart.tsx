import {
    Paper,
    useMantineTheme,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { useBreakdownStore } from '../hooks'

export const BreakdownBarChart = observer(() => {
    const theme = useMantineTheme()

    const store = useBreakdownStore()

    return (
        <Paper
            shadow="xs"
            style={{
                gridArea: 'bar',
                padding: '20px',
            }}
        >
            <ResponsiveContainer
                height="100%"
                width="100%"
            >
                <BarChart
                    data={store.barChartData}
                    height={300}
                    margin={{
                        bottom: 5,
                        left: 20,
                        right: 30,
                        top: 20,
                    }}
                    width={500}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {store.categories.map((category) => {
                        return (
                            <Bar
                                dataKey={category.name}
                                fill={theme.colors[category.color]?.[6]}
                                key={category.id}
                                stackId="stack"
                            />
                        )
                    })}
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    )
})
