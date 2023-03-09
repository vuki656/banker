import { faker } from '@faker-js/faker'

import { server } from '../../../server'
import {
    authenticatedContext,
    unauthenticatedContext,
    wipeDatabase,
} from '../../../shared/test-utils'
import { CategoryFactory, UserFactory } from '../../../shared/test-utils/factories'
import type {
    CategoriesQuery,
    CategoriesQueryVariables,
    CategoryQuery,
    CategoryQueryVariables,
    CreateCategoryInput,
    CreateCategoryMutation,
    CreateCategoryMutationVariables,
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables,
    UpdateCategoryInput,
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables,
} from '../../../shared/types/test-types.generated'

import {
    CATEGORIES,
    CATEGORY,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
} from './graphql'

describe('Category resolver', () => {
    beforeEach(async () => {
        await wipeDatabase()
    })

    describe('when `category` query is called', () => {
        it('should return category', async () => {
            const existingCategory = await CategoryFactory.create()

            const response = await server.executeOperation<
                CategoryQuery,
                CategoryQueryVariables
            >({
                query: CATEGORY,
                variables: {
                    args: {
                        id: existingCategory.id,
                    },
                },
            }, authenticatedContext())

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.category).toMatchObject(existingCategory)
        })

        it('should return an error if not authenticated', async () => {
            const response = await server.executeOperation<
                CategoryQuery,
                CategoryQueryVariables
            >({
                query: CATEGORY,
                variables: {
                    args: {
                        id: faker.datatype.uuid(),
                    },
                },
            }, unauthenticatedContext)

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when `categories` query is called', () => {
        it('should return categories', async () => {
            const CATEGORY_COUNT = 30

            const existingUser = await UserFactory.create()

            await CategoryFactory.createMany(CATEGORY_COUNT, {
                user: {
                    connect: {
                        id: existingUser.id
                    }
                }
            })

            const response = await server.executeOperation<
                CategoriesQuery,
                CategoriesQueryVariables
            >(
                { query: CATEGORIES },
                authenticatedContext(existingUser)
            )

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.categories).toHaveLength(CATEGORY_COUNT)
        })

        it('should return an error if not authenticated', async () => {
            const response = await server.executeOperation<
                CategoriesQuery,
                CategoriesQueryVariables
            >(
                { query: CATEGORIES },
                unauthenticatedContext
            )

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when `createCategory` mutation is called', () => {
        it('should create category', async () => {
            const KEYWORD_COUNT = 5

            const existingUser = await UserFactory.create()

            const input: CreateCategoryInput = {
                color: faker.color.rgb({ format: 'hex' }),
                icon: faker.lorem.word(),
                keywords: [...new Array(KEYWORD_COUNT)].map(() => {
                    return faker.lorem.word()
                }),
                name: faker.lorem.word(),
            }

            const response = await server.executeOperation<
                CreateCategoryMutation,
                CreateCategoryMutationVariables
            >({
                query: CREATE_CATEGORY,
                variables: {
                    input,
                },
            }, authenticatedContext(existingUser))

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            const category = response.body.singleResult.data?.createCategory.category ?? {}

            expect(response.body.singleResult.errors).toBeUndefined()
            expect(category).toMatchObject({
                ...input,
                keywords: input.keywords.map((keyword) => {
                    return {
                        id: expect.any(String),
                        name: keyword,
                    }
                }),
            })
        })

        it('should return an error if not authenticated', async () => {
            const response = await server.executeOperation<
                CreateCategoryMutation,
                CreateCategoryMutationVariables
            >({
                query: CREATE_CATEGORY,
                variables: {
                    input: {
                        color: faker.color.rgb({ format: 'hex' }),
                        icon: faker.lorem.word(),
                        keywords: [],
                        name: faker.lorem.word(),
                    },
                },
            }, unauthenticatedContext)

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when `updateCategory` mutation is called', () => {
        it('should update category', async () => {
            const existingUser = await UserFactory.create()

            const existingCategory = await CategoryFactory.create({
                user: {
                    connect: {
                        id: existingUser.id,
                    }
                }
            })

            const input: UpdateCategoryInput = {
                color: faker.color.rgb({ format: 'hex' }),
                icon: faker.lorem.word(),
                id: existingCategory.id,
                keywords: [],
                name: faker.lorem.word(),
            }

            const response = await server.executeOperation<
                UpdateCategoryMutation,
                UpdateCategoryMutationVariables
            >({
                query: UPDATE_CATEGORY,
                variables: {
                    input,
                },
            }, authenticatedContext(existingUser))

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.updateCategory.category).toMatchObject(input)
        })

        it('should return an error if not authenticated', async () => {
            const response = await server.executeOperation<
                UpdateCategoryMutation,
                UpdateCategoryMutationVariables
            >({
                query: UPDATE_CATEGORY,
                variables: {
                    input: {
                        color: faker.color.rgb({ format: 'hex' }),
                        icon: faker.lorem.word(),
                        id: faker.datatype.uuid(),
                        keywords: [],
                        name: faker.lorem.word(),
                    },
                },
            }, unauthenticatedContext)

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when `deleteCategory` mutation is called', () => {
        it('should delete category', async () => {
            const existingUser = await UserFactory.create()

            const existingCategory = await CategoryFactory.create({
                user: {
                    connect: {
                        id: existingUser.id,
                    }
                }
            })

            const response = await server.executeOperation<
                DeleteCategoryMutation,
                DeleteCategoryMutationVariables
            >({
                query: DELETE_CATEGORY,
                variables: {
                    input: {
                        id: existingCategory.id,
                    },
                },
            }, authenticatedContext())

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.deleteCategory.id).toBe(existingCategory.id)
        })

        it('should return an error if not authenticated', async () => {
            const response = await server.executeOperation<
                DeleteCategoryMutation,
                DeleteCategoryMutationVariables
            >({
                query: DELETE_CATEGORY,
                variables: {
                    input: {
                        id: faker.datatype.uuid(),
                    },
                },
            }, unauthenticatedContext)

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })
})
