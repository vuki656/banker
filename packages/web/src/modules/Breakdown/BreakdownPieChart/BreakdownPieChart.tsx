import { Paper } from '@mantine/core'
import {
    ArcElement,
    Chart,
    Legend,
    Tooltip,
} from 'chart.js'
import { observer } from 'mobx-react-lite'
import { Doughnut } from 'react-chartjs-2'

import { useBreakdownStore } from '../hooks'

Chart.register(ArcElement, Tooltip, Legend)

export const BreakdownPieChart = observer(() => {
    const store = useBreakdownStore()

    return (
        <Paper
            shadow="xs"
            style={{
                gridArea: 'pie',
                padding: '20px',
            }}
        >
            <Doughnut
                data={{
                    datasets: [
                        {
                            backgroundColor: Object.values(store.pieChartData).map((dataPoint) => {
                                return dataPoint.color
                            }),
                            data: Object.values(store.pieChartData).map((dataPoint) => {
                                return dataPoint.amount
                            }),
                        },
                    ],
                    labels: Object.keys(store.pieChartData),
                }}
            />
        </Paper>
    )
})
