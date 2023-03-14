import type { CodegenConfig } from '@graphql-codegen/cli'

import { SCHEMA_FILES_LOCATION } from './codegen'

const config: CodegenConfig = {
    documents: './src/resolvers/**/graphql/__test__/graphql/*.gql.ts',
    generates: {
        './src/shared/types/test-types.generated.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
            ],
        },
    },
    hooks: {
        afterOneFileWrite: ['prettier --write'],
    },
    overwrite: true,
    schema: SCHEMA_FILES_LOCATION,
}

export default config
