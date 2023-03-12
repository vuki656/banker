import { logger } from '../../shared/logger'

import { seedUsers } from './user'

const seed = async () => {
    await seedUsers()
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
