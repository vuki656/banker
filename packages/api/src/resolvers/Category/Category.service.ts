import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'

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

    public async createOne(input: CreateCategoryInput, userId?: string): Promise<CreateCategoryPayload> {
        const createdCategory = await orm.category.create({
            data: {
                color: input.color,
                icon: input.icon,
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

    public async updateOne(input: UpdateCategoryInput): Promise<UpdateCategoryPayload> {
        const updatedCategory = await orm.category.update({
            data: {
                color: input.color,
                icon: input.icon,
                name: input.name,
            },
            select: CATEGORY_DEFAULT_SELECT(),
            where: {
                id: input.id,
            },
        })

        return {
            category: updatedCategory,
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
}
