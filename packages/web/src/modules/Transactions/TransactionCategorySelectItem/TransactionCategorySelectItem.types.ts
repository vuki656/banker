import type { CategoryType } from '../../../shared/types'

export type TransactionCategorySelectItemProps =
    Pick<CategoryType, 'color' | 'icon'> &
    React.ComponentPropsWithoutRef<'div'> &
    { label: string }
