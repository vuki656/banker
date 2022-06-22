import type { CategoryType } from '../../../graphql/types.generated'

export type SummaryData = CategoryType & {
    total: number
}

export type BreakdownSummaryCardData = Record<string, CategoryType & {
    amount: number
}>

export type BreakdownBarChartData = Record<string, number> & {
    name: string
}
