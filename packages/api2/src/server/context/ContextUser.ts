import type { User } from '../../resolvers/graphql-types.generated'

export class ContextUser {
    public value: User | null

    constructor(user: User | null) {
        this.value = user
    }

    public get nonNullValue() {
        if (!this.value) {
            throw new Error('No user in context')
        }

        return this.value
    }
}
