/* eslint-disable no-console */

import {
    unlinkSync,
    writeFileSync,
} from 'fs'

import {
    generateEdgesType,
    pageInfoType,
} from './generatePaginationTypes.data'

const FILE = './src/shared/typegraphql-types/GeneratedPagination.types.ts'

unlinkSync(FILE)
writeFileSync(FILE, pageInfoType)

const resolverNames = [
    'User',
]

resolverNames.forEach((resolverName) => {
    writeFileSync(FILE, generateEdgesType(resolverName), { flag: 'a' })
})

console.log('=========== TYPE GENERATION FINISHED ===========')

process.exit(1)
