import { TransactionType } from "../../../graphql/types.generated"

export type TransactionProps = {
    onClick(): void
    value: TransactionType
}
