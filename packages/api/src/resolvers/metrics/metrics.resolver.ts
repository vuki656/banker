import type { Response } from 'express'

import { expressApp } from '../../server/express'
import { orm } from '../../shared/orm'

expressApp.get('/metrics', async (_, response: Response) => {
    response.set('Content-Type', 'text')

    const metrics = await orm.$metrics.prometheus()

    response.status(200).end(metrics)
})
