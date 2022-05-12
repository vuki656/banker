import { exec } from 'child_process'
import { writeFileSync } from 'fs'
import * as path from 'path'

import { printSchema } from 'graphql'

import 'reflect-metadata'
import { generateSchema } from './generateSchema'

const version = process.env.npm_package_version

const generatedSchemaWarning = `\
    # ------------------------------------------------ #
    # !!!   THIS FILE WAS GENERATED BY GRAPHQL     !!! #
    # !!!   DO NOT MODIFY THIS FILE BY YOURSELF    !!! #
    #             Version: ${version}                       #
    # ------------------------------------------------ #

`

const schema = generateSchema({
    authChecker: () => {
        return false
    },
})

writeFileSync(
    path.join(__dirname, '../../schema.graphql'),
    generatedSchemaWarning + printSchema(schema),
)

exec('prettier --write schema.graphql')