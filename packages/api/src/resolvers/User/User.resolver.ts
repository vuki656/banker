import { container } from 'tsyringe'
import {
    Arg,
    Mutation,
    Resolver,
} from 'type-graphql'

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
