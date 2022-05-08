/* eslint-disable no-console */

import 'reflect-metadata'
import { orm } from '../../shared/orm'

import { user } from './user'

// Seeds in $transaction don't have any relations
// Seeds in .then() required existing relations on seeds in $transaction
void orm
    .$transaction([
        ...user,
    ])
    .catch((error: unknown) => {
        console.log(error)

        process.exit(1)
    })
    .finally(() => {
        void orm.$disconnect()
    })
