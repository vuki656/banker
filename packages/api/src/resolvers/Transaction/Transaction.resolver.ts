import { container } from 'tsyringe'
import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import type { ContextType } from '../../shared/typescript-types'

import { TransactionsArgs } from './args'
import {
    CreateTransactionInput,
    DeleteTransactionInput,
    UpdateTransactionInput,
} from './inputs'
import {
    CreateTransactionPayload,
    DeleteTransactionPayload,
    UpdateTransactionPayload,
} from './payloads'
import { TransactionService } from './Transaction.service'
import { TransactionType } from './types'

@Resolver(() => TransactionType)
export class TransactionResolver {
    private service = container.resolve(TransactionService)

    @Authorized()
    @Query(() => [TransactionType])
    public async transactions(
        @Ctx() context: ContextType,
        @Arg(
            'args',
            () => TransactionsArgs,
            { nullable: true }
        ) args?: TransactionsArgs | null,
    ): Promise<TransactionType[]> {
        return this.service.findAll(args, context.user?.id)
    }

    @Authorized()
    @Mutation(() => CreateTransactionPayload)
    public async createTransaction(
        @Arg('input', () => CreateTransactionInput) input: CreateTransactionInput,
        @Ctx() context: ContextType,
    ): Promise<CreateTransactionPayload> {
        return this.service.createOne(input, context.user?.id)
    }

    @Authorized()
    @Mutation(() => UpdateTransactionPayload)
    public async updateTransaction(
        @Arg('input', () => UpdateTransactionInput) input: UpdateTransactionInput,
    ): Promise<UpdateTransactionPayload> {
        return this.service.updateOne(input)
    }

    @Authorized()
    @Mutation(() => DeleteTransactionPayload)
    public async deleteTransaction(
        @Arg('input', () => DeleteTransactionInput) input: DeleteTransactionInput,
    ): Promise<DeleteTransactionPayload> {
        return this.service.deleteOne(input)
    }
}
