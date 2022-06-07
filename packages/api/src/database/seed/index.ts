/* eslint-disable no-console */

import 'reflect-metadata'
import { orm } from '../../shared/orm'

import { transactions } from './transactions'
import { user } from './user'

void orm
    .$transaction([
        ...user,
        ...transactions,
    ])
    .catch((error: unknown) => {
        console.log(error)

        process.exit(1)
    })
    .finally(() => {
        void orm.$disconnect()
    })
