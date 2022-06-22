import type { CategoryType } from '../../../graphql/types.generated'

export type SummaryData = CategoryType & {
    total: number
}

export type PieChartData = CategoryType & {
    total: number
}

export type BarChartData = CategoryType & {
    total: number
}
