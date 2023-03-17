import { schedule } from 'node-cron'
import fetch from 'node-fetch'

import env from '../../shared/env'
import { logger } from '../../shared/logger'
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
        .then(() => {
            logger.info('Rates synced successfully')
        })
        .catch((error: unknown) => {
            logger.error({
                error,
                message: 'Error updating rates',
            })
        })
}

const updateIfDatabaseEmpty = async () => {
    const rates = await orm.rate.findMany()

    if (rates.length === 0) {
        await syncRates()

        return
    }

    logger.info(`Skipping rate sync as there are ${rates.length} already`)
}

export async function registerSyncRatesCron() {
    await updateIfDatabaseEmpty()

    const task = schedule(env.APP_CURRENCY_REFRESH_CRON, () => {
        void syncRates()
    })

    task.start()
}
