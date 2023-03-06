import type { CodegenConfig } from '@graphql-codegen/cli'

export const SCHEMA_FILES_LOCATION = './src/resolvers/**/*.gql'

const config: CodegenConfig = {
    generates: {
        './src/resolvers/': {
            config: {
                contextType: '../shared/types#Context',
                useIndexSignature: true,
            },
            hooks: {
                afterOneFileWrite: 'prettier --write',
            },
            plugins: [
                'typescript',
                'typescript-resolvers',
            ],
            preset: 'graphql-modules',
            presetConfig: {
                baseTypesPath: 'graphql-types.generated.ts',
                filename: 'resolver-types.generated.ts',
                useGraphQLModules: false,
            },
        },
    },
    schema: SCHEMA_FILES_LOCATION,
}

export default config
