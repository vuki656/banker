import { faker } from '@faker-js/faker'

import { server } from '../../../server'
import { orm } from '../../../shared/orm'
import { wipeDatabase } from '../../../shared/test-utils'
import type {
    CurrentUserQuery,
    CurrentUserQueryVariables,
    UpdateUserMutation,
    UpdateUserMutationVariables,
} from '../../../shared/types/test-types.generated'
import type { UpdateUserInput } from '../../graphql-types.generated'

import { UPDATE_USER } from './graphql/mutations.gql'
import { CURRENT_USER } from './graphql/queries.gql'

// TODO: auth tests for each thing?
describe('User resolver', () => {
    beforeEach(async () => {
        await wipeDatabase()
    })

    describe.skip('when `currentUser` query is called', () => {
        it('should return current user if logged in', async () => {
            const existingUser = await orm.user.create({
                data: {
                    email: faker.internet.email(),
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    password: faker.internet.password(),
                },
            })

            const response = await server.executeOperation<
                CurrentUserQuery,
                CurrentUserQueryVariables
            >({
                query: CURRENT_USER,
            })

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(existingUser).toMatchObject(response.body.singleResult.data?.currentUser ?? {})
        })

        it('should return null if not logged in', async () => {
            const existingUser = await orm.user.create({
                data: {
                    email: faker.internet.email(),
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    password: faker.internet.password(),
                },
            })

            const response = await server.executeOperation<
                CurrentUserQuery,
                CurrentUserQueryVariables
            >({
                query: CURRENT_USER,
            })

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(existingUser).toMatchObject(response.body.singleResult.data?.currentUser ?? {})
        })
    })

    describe('when `updateUser` mutation is called', () => {
        it('should update that user', async () => {
            const existingUser = await orm.user.create({
                data: {
                    email: faker.internet.email(),
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    password: faker.internet.password(),
                },
            })

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
            })

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

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
            })

            if (response.body.kind === 'incremental') {
                throw new Error('Wrong response type')
            }

            expect(response.body.singleResult.errors?.[0]?.message).toContain('Record to update not found')
        })
    })

    describe('when login mutation is called', () => {
        it.todo('something is missing')

        it.todo('should throw an error when sent token is not holding an object')

        it.todo('should throw an error if user not found in database')

        it.todo('should return user')
    })
})
