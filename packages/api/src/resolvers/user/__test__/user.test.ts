import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

import { server } from '../../../server'
import {
    authenticatedContext,
    executeOperation,
    unauthenticatedContext,
    wipeDatabase,
} from '../../../shared/test-utils'
import { UserFactory } from '../../../shared/test-utils/factories'
import type {
    CurrentUserQuery,
    CurrentUserQueryVariables,
    LoginUserMutation,
    LoginUserMutationVariables,
    UpdateUserMutation,
    UpdateUserMutationVariables,
} from '../../../shared/types/test-types.generated'
import type { UpdateUserInput } from '../../graphql-types.generated'

import {
    LOGIN_USER,
    UPDATE_USER,
} from './graphql/mutations.gql'
import { CURRENT_USER } from './graphql/queries.gql'

describe('User resolver', () => {
    beforeEach(async () => {
        await wipeDatabase()
    })

    describe('when `currentUser` query is called', () => {
        it('should return current user', async () => {
            const response = await executeOperation<
                CurrentUserQuery,
                CurrentUserQueryVariables
            >(
                { query: CURRENT_USER },
                authenticatedContext(),
            )

            expect(response.body?.singleResult.errors).toBeUndefined()
            expect(response.body?.singleResult.data?.currentUser).toBeDefined()
        })

        it('should return an error if not authenticated', async () => {
            const response = await executeOperation<
                CurrentUserQuery,
                CurrentUserQueryVariables
            >(
                { query: CURRENT_USER },
                unauthenticatedContext
            )

            expect(response?.body?.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when `updateUser` mutation is called', () => {
        it('should update that user', async () => {
            const existingUser = await UserFactory.create()

            const input: Omit<UpdateUserInput, 'id'> = {
                currency: faker.finance.currencyCode(),
                email: faker.internet.email(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            }

            const response = await server.executeOperation<
                UpdateUserMutation,
                UpdateUserMutationVariables
            >({
                query: UPDATE_USER,
                variables: {
                    input: {
                        id: existingUser.id,
                        ...input,
                    },
                },
            }, authenticatedContext())

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.updateUser.user).toMatchObject({
                id: existingUser.id,
                ...input,
            })
        })

        it('should return an error if user not found', async () => {
            const response = await server.executeOperation<
                UpdateUserMutation,
                UpdateUserMutationVariables
            >({
                query: UPDATE_USER,
                variables: {
                    input: {
                        currency: faker.finance.currencyCode(),
                        email: faker.internet.email(),
                        firstName: faker.name.firstName(),
                        id: faker.datatype.uuid(),
                        lastName: faker.name.lastName(),
                    },
                },
            }, authenticatedContext())

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toContain('Record to update not found')
        })

        it('should return an error if not authenticated', async () => {
            const response = await server.executeOperation<
                UpdateUserMutation,
                UpdateUserMutationVariables
            >({
                query: UPDATE_USER,
                variables: {
                    input: {
                        currency: faker.finance.currencyCode(),
                        email: faker.internet.email(),
                        firstName: faker.name.firstName(),
                        id: faker.datatype.uuid(),
                        lastName: faker.name.lastName(),
                    },
                },
            }, unauthenticatedContext)

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('Forbidden')
        })
    })

    describe('when login mutation is called', () => {
        it('should return an error if user not found in database', async () => {
            const response = await server.executeOperation<
                LoginUserMutation,
                LoginUserMutationVariables
            >({
                query: LOGIN_USER,
                variables: {
                    input: {
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                    },
                },
            })

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('No User found')
        })

        it('should return an error if the password is wrong', async () => {
            const existingUser = await UserFactory.create()

            const response = await server.executeOperation<
                LoginUserMutation,
                LoginUserMutationVariables
            >({
                query: LOGIN_USER,
                variables: {
                    input: {
                        email: existingUser.email,
                        password: faker.lorem.word(),
                    },
                },
            })

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toBe('Wrong password')
        })

        it('should return user and token on valid login', async () => {
            const password = faker.lorem.word()
            const passwordHash = await hash(password, 10)

            const existingUser = await UserFactory.create({
                password: passwordHash,
            })

            const response = await server.executeOperation<
                LoginUserMutation,
                LoginUserMutationVariables
            >({
                query: LOGIN_USER,
                variables: {
                    input: {
                        email: existingUser.email,
                        password,
                    },
                },
            })

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.loginUser.token).toBeDefined()
            expect(existingUser).toMatchObject(response.body.singleResult.data?.loginUser.user ?? {})
        })
    })
})
