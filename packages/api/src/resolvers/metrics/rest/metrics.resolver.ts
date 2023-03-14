import type { Response } from 'express'

import { expressRouter } from '../../../server/express'
import { orm } from '../../../shared/orm'

export const metricsRoute = expressRouter.get('/', async (_, response: Response) => {
    response.set('Content-Type', 'text')

    const metrics = await orm.$metrics.prometheus()

    response.status(200).end(metrics)
})
