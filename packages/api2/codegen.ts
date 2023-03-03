import type { CodegenConfig } from '@graphql-codegen/cli'

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
    schema: './src/resolvers/**/*.gql',
}

export default config
