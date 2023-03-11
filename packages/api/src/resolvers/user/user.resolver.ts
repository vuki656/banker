import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import env from '../../shared/env'
import { ForbiddenError } from '../../shared/errors'
import { logger } from '../../shared/logger'
import { orm } from '../../shared/orm'
import type { TokenDataType } from '../../shared/types'
import { checkAuth } from '../../shared/utils'

import type { UserModule } from './resolver-types.generated'
import { userSelect } from './user.select'
import {
    loginUserMutationValidation,
    updateUserMutationValidation,
} from './user.validation'

const UserResolver: UserModule.Resolvers = {
    Mutation: {
        loginUser: async (_, variables) => {
            const input = loginUserMutationValidation.parse(variables.input)

            logger.info('input: ', input)

            const user = await orm.user.findUniqueOrThrow({
                select: {
                    ...userSelect,
                    password: true,
                },
                where: {
                    email: input.email,
                },
            })

            logger.info('user: ', user)

            const isValid = await compare(input.password, user.password)

            logger.info('isValid: ', isValid)

            if (!isValid) {
                throw new ForbiddenError('Wrong password')
            }

            const tokenData: TokenDataType = {
                user,
            }

            logger.info('tokenData: ', tokenData)

            const token = sign(
                tokenData,
                env.APP_JWT_SECRET,
                { expiresIn: env.APP_JWT_DURATION }
            )

            logger.info('token: ', token)

            return {
                token,
                user,
            }
        },
        updateUser: async (_, variables, context) => {
            checkAuth(context)

            const input = updateUserMutationValidation.parse(variables.input)

            const updatedUser = await orm.user.update({
                data: {
                    currency: input.currency,
                    email: input.email,
                    firstName: input.firstName,
                    lastName: input.lastName,
                },
                select: userSelect,
                where: {
                    id: input.id,
                },
            })

            return {
                user: updatedUser,
            }
        },
    },
    Query: {
        currentUser: (_, __, context) => {
            checkAuth(context)

            return context.user.nonNullValue
        },
    },
}

export default UserResolver

