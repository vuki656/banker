import type { CategoryType } from '../../../graphql/types.generated'

export type TransactionCategorySelectItemProps =
    Pick<CategoryType, 'color' | 'icon'> &
    React.ComponentPropsWithoutRef<'div'> &
    { label: string }
