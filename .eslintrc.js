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
                // TODO: Isn't detected for some reason -- check style guide config on setup for this
                '@next/next/no-html-link-for-pages': ['error', 'packages/web/src'],
                // Broken for some reason
                'react/sort-default-props': 'off',
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
