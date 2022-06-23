import type { CategoryType } from '../../../graphql/types.generated'

export type SummaryDataType = CategoryType & {
    total: number
}

export type PieChartDataType = CategoryType & {
    total: number
}

export type BarChartDataType = Record<string, number | string> & {
    date: string
}
