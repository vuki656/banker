import type { KeywordType } from '../../../../graphql/types.generated'

export type KeywordFormProps = {
    onCancel(): void
    onSubmit(name: KeywordType): void
}
