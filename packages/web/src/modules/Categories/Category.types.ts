import type { CategoryType } from '../../graphql/types.generated'

export type CategoryProps = {
    onSubmit(): Promise<unknown>
    value: CategoryType
}
