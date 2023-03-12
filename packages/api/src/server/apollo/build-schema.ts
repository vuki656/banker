import { writeFileSync } from 'fs'

import { print } from 'graphql'

import { typeDefs } from './type-defs'

writeFileSync('./schema.graphql', print(typeDefs))
