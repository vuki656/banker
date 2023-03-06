import { orm } from '../../shared/orm'

import {
    categorySelect,
    keywordSelect,
} from './category.select'
import {
    categoryQueryValidation,
    createCategoryMutationValidation,
    deleteCategoryMutationValidation,
    updateCategoryMutationValidation,
} from './category.validation'
import type { CategoryModule } from './resolver-types.generated'

const CategoryResolver: CategoryModule.Resolvers = {
    Mutation: {
        createCategory: async (_, variables, context) => {
            const input = createCategoryMutationValidation.parse(variables.input)

            const createdCategory = await orm.category.create({
                data: {
                    color: input.color,
                    icon: input.icon,
                    keywords: {
                        createMany: {
                            data: input.keywords.map((keyword) => {
                                return {
                                    name: keyword,
                                }
                            }),
                        },
                    },
                    name: input.name,
                    user: {
                        connect: {
                            id: context.user.nonNullValue.id,
                        },
                    },
                },
                select: {
                    ...categorySelect,
                    keywords: {
                        select: {
                            ...keywordSelect,
                        },
                    },
                },
            })

            return {
                category: createdCategory,
            }
        },
        deleteCategory: async (_, variables) => {
            const input = deleteCategoryMutationValidation.parse(variables.input)

            // TODO: what about keywords that are related
            await orm.category.delete({
                where: {
                    id: input.id,
                },
            })

            return {
                id: input.id,
            }
        },
        updateCategory: async (_, variables, context) => {
            const input = updateCategoryMutationValidation.parse(variables.input)

            const updatedCategory = await orm.$transaction(async (transaction) => {
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
                                        name: keyword,
                                    }
                                }),
                            },
                        },
                        name: input.name,
                        user: {
                            connect: {
                                id: context.user.nonNullValue.id,
                            },
                        },
                    },
                    select: {
                        ...categorySelect,
                        keywords: {
                            select: {
                                ...keywordSelect,
                            },
                        },
                    },
                    where: {
                        id: input.id,
                    },
                })
            })

            return {
                category: updatedCategory,
            }
        },
    },
    Query: {
        category: (_, variables) => {
            const args = categoryQueryValidation.parse(variables.args)

            return orm.category.findUniqueOrThrow({
                select: {
                    ...categorySelect,
                    keywords: {
                        select: {
                            ...keywordSelect,
                        },
                    },
                },
                where: {
                    id: args.id,
                },
            })
        },
    },
}

export default CategoryResolver
