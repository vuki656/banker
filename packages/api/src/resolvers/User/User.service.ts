import { AuthenticationError } from 'apollo-server'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { singleton } from 'tsyringe'

import { env } from '../../shared/env'
import { orm } from '../../shared/orm'
import type { TokenDataType } from '../../shared/typescript-types'

import type {
    LoginUserInput,
    UpdateUserInput,
} from './inputs'
import type {
    LoginUserPayload,
    UpdateUserPayload,
} from './payloads'
import { USER_DEFAULT_SELECT } from './User.select'

@singleton()
export class UserService {
    public async login(input: LoginUserInput): Promise<LoginUserPayload> {
        const foundUser = await orm.user.findUnique({
            select: {
                ...USER_DEFAULT_SELECT(),
                password: true,
            },
            where: {
                email: input.email,
            },
        })

        if (!foundUser) {
            throw new AuthenticationError('User doesn\'t exist')
        }

        const { password, ...user } = foundUser

        const isValid = await compare(input.password, password)

        if (!isValid) {
            throw new AuthenticationError('Wrong password')
        }

        const tokenData: TokenDataType = {
            user,
        }

        const token = sign(
            tokenData,
            env.APP_JWT_SECRET,
            { expiresIn: env.APP_JWT_DURATION }
        )

        return {
            token,
            user,
        }
    }

    public async updateOne(input: UpdateUserInput): Promise<UpdateUserPayload> {
        const updatedUser = await orm.user.update({
            data: {
                currency: input.currency,
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
            },
            select: USER_DEFAULT_SELECT(),
            where: {
                id: input.id,
            },
        })

        return {
            user: updatedUser,
        }
    }
}
