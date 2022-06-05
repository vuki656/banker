import { Paper } from '@mantine/core'
import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import { observer } from 'mobx-react-lite'
import { Bar } from 'react-chartjs-2'

import { useBreakdownStore } from '../hooks'

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BreakdownBarChart = observer(() => {
    const store = useBreakdownStore()

    return (
        <Paper
            shadow="xs"
            style={{
                gridArea: 'bar',
                padding: '20px',
            }}
        >
            <Bar
                data={{
                    datasets: store.barChartData.data,
                    labels: store.barChartData.labels,
                }}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                        },
                    },
                }}
            />
        </Paper>
    )
})
