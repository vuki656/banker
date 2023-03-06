import { logger } from '@banker/api/src/shared/utils'
import { schedule } from 'node-cron'
import fetch from 'node-fetch'

import env from '../../shared/env'
import { orm } from '../../shared/orm'

import { ratesValidation } from './syncRates.validation'

const syncRates = async () => {
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${env.APP_CURRENCY_REFRESH_TOKEN}`)
        .then(async (_response) => {
            return _response.json()
        })
        .catch((error: unknown) => {
            logger.error({
                error,
                message: 'Error fetching updated currency rates',
            })
        })

    const rates = ratesValidation.parse(response).rates

    orm
        .$transaction(async (transaction) => {
            await transaction.rate.deleteMany()

            await transaction.rate.createMany({
                data: Object
                    .entries(rates)
                    .map(([code, value]) => {
                        return {
                            code,
                            value,
                        }
                    }),
            })
        })
        .catch((error: unknown) => {
            logger.error({
                error,
                message: 'Error updating rates',
            })
        })
}

export function registerSyncRatesCron() {
    const task = schedule(env.APP_CURRENCY_REFRESH_CRON, () => {
        void syncRates()
    })

    task.start()
}
