import { logger } from '../../shared/logger'
import { wipeDatabase } from '../../shared/test-utils'

import { seedCategories } from './categories'
import { seedTransactions } from './transactions'
import { seedUsers } from './user'

const seed = async () => {
    await wipeDatabase()

    await seedUsers()
    await seedCategories()
    await seedTransactions()
}

void seed()
    .then(() => {
        logger.info('Seed completed')
    })
    .catch((error: unknown) => {
        logger.error({
            error,
            message: 'Seed failed',
        })
    })
