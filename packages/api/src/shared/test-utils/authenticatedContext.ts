import type { ExecuteOperationOptions } from '@apollo/server/dist/esm/externalTypes/graphql'
import { faker } from '@faker-js/faker'

import type { User } from '../../resolvers/graphql-types.generated'
import { ContextUser } from '../../server'
import { logger } from '../logger'
import type { Context } from '../types'

const user: User = {
    __typename: 'User',
    currency: faker.finance.currencyCode(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    id: faker.datatype.uuid(),
    lastName: faker.name.lastName(),
}

export const authenticatedContext = (existingUser?: User): ExecuteOperationOptions<Context> => {
    return {
        contextValue: {
            logger,
            user: new ContextUser(existingUser ?? user),
        },
    }
}
