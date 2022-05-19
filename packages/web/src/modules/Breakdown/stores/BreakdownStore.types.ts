import type { CategoryType } from '../../../graphql/types.generated'

export type BreakdownCardData = Record<string, CategoryType & {
    amount: number
}>
