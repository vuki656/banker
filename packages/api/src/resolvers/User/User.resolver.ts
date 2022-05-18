import { container } from 'tsyringe'
import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import type { ContextType } from '../../shared/typescript-types'

import { UserArgs } from './args'
import {
    ChangeUserPasswordInput,
    CreateUserInput,
    LoginUserInput,
    UpdateUserInput,
} from './inputs'
import {
    ChangeUserPasswordPayload,
    CreateUserPayload,
    LoginUserPayload,
    UpdateUserPayload,
} from './payloads'
import { UserType } from './types'
import { UserService } from './User.service'

@Resolver(() => UserType)
export class UserResolver {
    private service = container.resolve(UserService)

    @Authorized()
    @Query(() => UserType, { nullable: true })
    public async currentUser(
        @Ctx() context: ContextType,
    ): Promise<UserType | null> {
        return this.service.currentUser(context.user?.id)
    }

    @Authorized()
    @Mutation(() => ChangeUserPasswordPayload)
    public async changeUserPassword(
        @Arg('input', () => ChangeUserPasswordInput) input: ChangeUserPasswordInput,
    ): Promise<ChangeUserPasswordPayload> {
        return this.service.changePassword(input)
    }

    @Authorized()
    @Query(() => UserType, { nullable: true })
    public async user(
        @Arg('args', () => UserArgs) args: UserArgs,
    ): Promise<UserType | null> {
        return this.service.findOne(args)
    }

    @Authorized()
    @Mutation(() => CreateUserPayload)
    public async createUser(
        @Arg('input', () => CreateUserInput) input: CreateUserInput,
    ): Promise<CreateUserPayload> {
        return this.service.createOne(input)
    }

    @Authorized()
    @Mutation(() => UpdateUserPayload)
    public async updateUser(
        @Arg('input', () => UpdateUserInput) input: UpdateUserInput,
    ): Promise<UpdateUserPayload> {
        return this.service.updateOne(input)
    }

    @Mutation(() => LoginUserPayload)
    public async loginUser(
        @Arg('input', () => LoginUserInput) credentials: LoginUserInput,
    ): Promise<LoginUserPayload> {
        return this.service.login(credentials)
    }
}
