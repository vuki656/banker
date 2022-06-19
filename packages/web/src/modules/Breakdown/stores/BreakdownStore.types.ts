import type { CategoryType } from '../../../graphql/types.generated'

export type BreakdownSummaryCardData = Record<string, CategoryType & {
    amount: number
}>

export type BreakdownBarChartData = {
    data: any
    name: string
}

