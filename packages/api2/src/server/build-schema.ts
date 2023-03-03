import { print } from 'graphql'
import { writeFileSync } from 'fs'

import { typeDefs } from './type-defs'

writeFileSync('./schema.graphql', print(typeDefs))
