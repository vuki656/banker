import type { CodegenConfig } from '@graphql-codegen/cli'

import { SCHEMA_FILES_LOCATION } from './codegen'

const config: CodegenConfig = {
    documents: './src/resolvers/**/__test__/graphql/*.gql.ts',
    generates: {
        './src/shared/types/test-types.generated.ts': {
            hooks: {
                afterAllFileWrite: 'prettier --write --print-width 80',
            },
            plugins: [
                'typescript',
                'typescript-operations',
            ],
        },
    },
    overwrite: true,
    schema: SCHEMA_FILES_LOCATION,
}

export default config
