import { Prisma } from "@prisma/client"
import { GraphQLError } from "graphql"
import { context } from "../../server"
import { orm } from "../../shared/orm"

export const convertTransaction = async (transactions: Prisma.TransactionType) => {
            const rates = await orm
                .rate
                .findMany()
                .then((response) => {
                    const values = new Map<string, number>()

                    response.forEach((rate) => {
                        values.set(rate.code, rate.value)
                    })

                    return values
                })

            for await (const transaction of transactions) {
                const transactionRate = rates.get(transaction.currency)

                if (!transactionRate) {
                    throw new GraphQLError(`{
                        message: "Transaction has invalid currency code",
                        transaction,
                    }`)
                }


                const targetRate = rates.get(context.user?.currency ?? '')

                if (!targetRate) {
                    throw new Error('Couldn\'t find target rate while converting currency')
                }

                const baseValue = transaction.amount.toNumber() / transactionRate

                return baseValue * targetRate
            }
}
