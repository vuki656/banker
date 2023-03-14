import { z } from 'zod'

import { userValidation } from '../../../resolvers/user/graphql'

export const cookieValidation = z.object({
    user: userValidation.nullable(),
})
