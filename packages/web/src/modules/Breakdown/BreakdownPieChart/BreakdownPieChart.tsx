import {
    Paper,
    useMantineTheme,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'
import {
    Cell,
    Pie,
    PieChart,
    Tooltip,
} from 'recharts'

import { useBreakdownStore } from '../hooks'

export const BreakdownPieChart = observer(() => {
    const theme = useMantineTheme()

    const store = useBreakdownStore()

    return (
        <Paper
            shadow="xs"
            style={{
                gridArea: 'pie',
                padding: '20px',
            }}
        >
            <PieChart
                height={400}
                width={400}
            >
                <Tooltip />
                <Pie
                    cx={120}
                    cy={200}
                    data={store.pieChartData}
                    dataKey="total"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                >
                    {store.pieChartData.map((category, index) => (
                        <Cell
                            fill={theme.colors[category.color]?.[6]}
                            key={`cell-${index}`}
                        />
                    ))}
                </Pie>
            </PieChart>
        </Paper>
    )
})
