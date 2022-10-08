import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'

import type { CategoryArgs } from './args'
import { CATEGORY_DEFAULT_SELECT } from './Category.select'
import type {
    CreateCategoryInput,
    DeleteCategoryInput,
    UpdateCategoryInput,
} from './inputs'
import type {
    CreateCategoryPayload,
    DeleteCategoryPayload,
    UpdateCategoryPayload,
} from './payloads'
import type { CategoryType } from './types'

@singleton()
export class CategoryService {
    public async createOne(input: CreateCategoryInput, userId?: string): Promise<CreateCategoryPayload> {
        const createdCategory = await orm.category.create({
            data: {
                color: input.color,
                icon: input.icon,
                keywords: {
                    createMany: {
                        data: input.keywords.map((keyword) => {
                            return {
                                name: keyword.toLowerCase(),
                            }
                        }),
                    },
                },
                name: input.name,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
            select: CATEGORY_DEFAULT_SELECT(),
        })

        return {
            category: createdCategory,
        }
    }

    public async deleteOne(input: DeleteCategoryInput): Promise<DeleteCategoryPayload> {
        const deletedCategory = await orm.category.delete({
            select: {
                id: true,
            },
            where: {
                id: input.id,
            },
        })

        return {
            id: deletedCategory.id,
        }
    }

    public async findAll(userId?: string): Promise<CategoryType[]> {
        return orm.category.findMany({
            orderBy: {
                name: 'asc',
            },
            select: CATEGORY_DEFAULT_SELECT(),
            where: {
                isDeleted: false,
                user: {
                    id: userId,
                },
            },
        })
    }

    public async findOne(args: CategoryArgs, userId?: string): Promise<CategoryType | null> {
        return orm.category.findFirst({
            select: CATEGORY_DEFAULT_SELECT(),
            where: {
                id: args.id,
                user: {
                    id: userId,
                },
            },
        })
    }

    public async updateOne(input: UpdateCategoryInput): Promise<UpdateCategoryPayload> {
        const category = await orm.$transaction(async (transaction) => {
            await transaction.keyword.deleteMany({
                where: {
                    category: {
                        id: input.id,
                    },
                },
            })

            return transaction.category.update({
                data: {
                    color: input.color,
                    icon: input.icon,
                    keywords: {
                        createMany: {
                            data: input.keywords.map((keyword) => {
                                return {
                                    name: keyword.name.toLowerCase(),
                                }
                            }),
                        },
                    },
                    name: input.name,
                },
                select: CATEGORY_DEFAULT_SELECT(),
                where: {
                    id: input.id,
                },
            })
        })

        return {
            category,
        }
    }
}
