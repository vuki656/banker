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

import { CategoryArgs } from './args'
import { CategoryService } from './Category.service'
import {
    CreateCategoryInput,
    DeleteCategoryInput,
    UpdateCategoryInput,
} from './inputs'
import {
    CreateCategoryPayload,
    DeleteCategoryPayload,
    UpdateCategoryPayload,
} from './payloads'
import { CategoryType } from './types'

@Resolver(() => CategoryType)
export class CategoryResolver {
    private service = container.resolve(CategoryService)

    @Authorized()
    @Query(() => [CategoryType])
    public async categories(
        @Ctx() context: ContextType,
    ): Promise<CategoryType[]> {
        return this.service.findAll(context.user?.id)
    }

    @Authorized()
    @Query(() => CategoryType, { nullable: true })
    public async category(
        @Arg('args', () => CategoryArgs) args: CategoryArgs,
        @Ctx() context: ContextType,
    ): Promise<CategoryType | null> {
        return this.service.findOne(args, context.user?.id)
    }

    @Authorized()
    @Mutation(() => CreateCategoryPayload)
    public async createCategory(
        @Arg('input', () => CreateCategoryInput) input: CreateCategoryInput,
        @Ctx() context: ContextType,
    ): Promise<CreateCategoryPayload> {
        return this.service.createOne(input, context.user?.id)
    }

    @Mutation(() => DeleteCategoryPayload)
    public async deleteCategory(
        @Arg('input', () => DeleteCategoryInput) credentials: DeleteCategoryInput,
    ): Promise<DeleteCategoryPayload> {
        return this.service.deleteOne(credentials)
    }

    @Authorized()
    @Mutation(() => UpdateCategoryPayload)
    public async updateCategory(
        @Arg('input', () => UpdateCategoryInput) input: UpdateCategoryInput,
    ): Promise<UpdateCategoryPayload> {
        return this.service.updateOne(input)
    }
}