import type { CategoryType } from '../../../graphql/types.generated'

export type SummaryData = {
    id: string
    name: string
    total: number
}

export type BreakdownSummaryCardData = Record<string, CategoryType & {
    amount: number
}>

export type BreakdownBarChartData = Record<string, number> & {
    name: string
}
