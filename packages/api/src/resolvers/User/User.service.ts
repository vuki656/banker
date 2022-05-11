import { AuthenticationError } from 'apollo-server'
import {
    compare,
    hash,
} from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { singleton } from 'tsyringe'

import { env } from '../../shared/env'
import { orm } from '../../shared/orm'
import type { TokenDataType } from '../../shared/typescript-types'

import type { UserArgs } from './args'
import type {
    ChangeUserPasswordInput,
    CreateUserInput,
    DeleteUserInput,
    LoginUserInput,
    UpdateUserInput,
} from './inputs'
import type {
    ChangeUserPasswordPayload,
    CreateUserPayload,
    DeleteUserPayload,
    LoginUserPayload,
    UpdateUserPayload,
} from './payloads'
import type { UserType } from './types'
import { USER_DEFAULT_SELECT } from './User.select'

@singleton()
export class UserService {
    public async currentUser(id?: string): Promise<UserType | null> {
        if (!id) {
            return null
        }

        return orm.user.findUnique({
            select: USER_DEFAULT_SELECT(),
            where: {
                id,
            },
        })
    }

    public async findOne(args: UserArgs): Promise<UserType | null> {
        return orm.user.findUnique({
            select: USER_DEFAULT_SELECT(),
            where: {
                id: args.id,
            },
        })
    }

    public async createOne(input: CreateUserInput): Promise<CreateUserPayload> {
        const passwordHash = await hash(input.password, 10)

        const createdUser = await orm.user.create({
            data: {
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                password: passwordHash,
            },
            select: USER_DEFAULT_SELECT(),
        })

        return {
            user: createdUser,
        }
    }

    public async updateOne(input: UpdateUserInput): Promise<UpdateUserPayload> {
        const updatedUser = await orm.user.update({
            data: {
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

    public async deleteOne(input: DeleteUserInput): Promise<DeleteUserPayload> {
        const deletedUser = await orm.user.delete({
            select: {
                id: true,
            },
            where: {
                id: input.id,
            },
        })

        return {
            id: deletedUser.id,
        }
    }

    public async changePassword(input: ChangeUserPasswordInput): Promise<ChangeUserPasswordPayload> {
        const passwordHash = await hash(input.password, 10)

        const updatedUser = await orm.user.update({
            data: {
                password: passwordHash,
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
        }
    }
}
