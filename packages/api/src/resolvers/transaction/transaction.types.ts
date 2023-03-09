import type { Transaction } from '@prisma/client'

export type BaseTransaction = Pick<Transaction, 'amount' | 'currency' | 'date'> & Record<string, unknown>
