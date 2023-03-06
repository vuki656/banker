import { Decimal } from "@prisma/client/runtime"

export type BaseTransaction = {
    [key: string]: unknown
    amount: Decimal
    currency: string
    date: Date
}
