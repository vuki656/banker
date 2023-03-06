import { z } from 'zod'

import { userValidation } from '../../resolvers/user'

export const cookieValidation = z.object({
    user: userValidation.nullable(),
})
