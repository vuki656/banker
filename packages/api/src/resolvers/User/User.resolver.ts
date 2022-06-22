import { container } from 'tsyringe'
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../shared/typescript-types'

import {
    LoginUserInput,
    UpdateUserInput,
} from './inputs'
import {
    LoginUserPayload,
    UpdateUserPayload,
} from './payloads'
import { UserType } from './types'
import { UserService } from './User.service'

@Resolver(() => UserType)
export class UserResolver {
    private service = container.resolve(UserService)

    @Query(() => UserType, { nullable: true })
    public async currentUser(
        @Ctx() context: ContextType,
    ): Promise<UserType | null> {
        console.log('context: ', context.user)

        return context.user
    }

    @Mutation(() => LoginUserPayload)
    public async loginUser(
        @Arg('input', () => LoginUserInput) input: LoginUserInput,
    ): Promise<LoginUserPayload> {
        return this.service.login(input)
    }

    @Mutation(() => UpdateUserPayload)
    public async updateUser(
        @Arg('input', () => UpdateUserInput) input: UpdateUserInput,
    ): Promise<UpdateUserPayload> {
        return this.service.updateOne(input)
    }
}
