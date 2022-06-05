import type { CategoryType } from '../../../graphql/types.generated'

export type BreakdownSummaryCardData = Record<string, CategoryType & {
    amount: number
}>

export type BreakdownBarChartData = {
    backgroundColor: string
    data: any
    label: string
}

