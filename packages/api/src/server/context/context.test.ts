import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { faker } from '@faker-js/faker'
import { sign } from 'jsonwebtoken'

import env from '../../shared/env'
import { UserFactory } from '../../shared/test-utils/factories'
import type { TokenDataType } from '../../shared/types'

import { context } from './context'

describe('context', () => {
    describe('when invalid token is sent', () => {
        it('should return context with user being null', async () => {
            const request = {
                req: {
                    headers: {
                        authorization: faker.lorem.word(),
                    },
                },
            } as StandaloneServerContextFunctionArgument

            const createdContext = await context(request)

            expect(createdContext.user.value).toBeNull()
        })
    })

    describe('when valid token is sent', () => {
        it('should return context with valid user', async () => {
            const tokenData: TokenDataType = {
                user: UserFactory.build(),
            }

            const token = sign(
                tokenData,
                env.APP_JWT_SECRET,
                { expiresIn: env.APP_JWT_DURATION }
            )

            const request = {
                req: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            } as StandaloneServerContextFunctionArgument

            const createdContext = await context(request)

            expect(tokenData.user).toMatchObject(createdContext.user.value ?? {})
        })
    })
})
