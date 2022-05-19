import { Box, Paper } from '@mantine/core'
import {
    ArcElement,
    Chart,
    Legend,
    Tooltip,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { useBreakdownStore } from '../hooks'

Chart.register(ArcElement, Tooltip, Legend)

export const BreakdownPieChart: React.FunctionComponent = () => {
    const store = useBreakdownStore()

    return (
        <Paper
            style={{
                height: '300px',
                width: '300px',
                padding: '20px'
            }}
            shadow='xs'
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
}
