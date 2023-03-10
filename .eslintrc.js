/** @type { import('@types/eslint').ESLint.ConfigData } */
module.exports = {
    extends: [require.resolve('@rimac-technology/style-guide/eslint/core')],
    ignorePatterns: [
        '*generated*',
        'dist',
        'coverage',
    ],
    overrides: [
        {
            extends: [require.resolve('@rimac-technology/style-guide/eslint/jest')],
            files: ['**/*.test.ts'],
        },
        {
            extends: [
                require.resolve('@rimac-technology/style-guide/eslint/react'),
                require.resolve('@rimac-technology/style-guide/eslint/next'),
            ],
            files: ['./packages/web/**/*.tsx'],
            rules: {
                // Broken for some reason
                'react/sort-default-props': 'off',
            },
            settings: {
                next: {
                    rootDir: './packages/web/src/',
                },
            },
        },
        {
            extends: [require.resolve('@rimac-technology/style-guide/eslint/type-graphql')],
            files: ['./packages/api/**/*.ts'],
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.lint.json',
    },
}
