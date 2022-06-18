import type { CategoryType } from '../../../graphql/types.generated'

export type CategoryProps = {
    onClick(): void
    value: CategoryType
}
