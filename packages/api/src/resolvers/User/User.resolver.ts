import { container } from 'tsyringe'
import {
    Arg,
    Mutation,
    Resolver,
} from 'type-graphql'

import { LoginUserInput } from './inputs'
import { LoginUserPayload } from './payloads'
import { UserType } from './types'
import { UserService } from './User.service'

@Resolver(() => UserType)
export class UserResolver {
    private service = container.resolve(UserService)

    @Mutation(() => LoginUserPayload)
    public async loginUser(
        @Arg('input', () => LoginUserInput) credentials: LoginUserInput,
    ): Promise<LoginUserPayload> {
        return this.service.login(credentials)
    }
}
