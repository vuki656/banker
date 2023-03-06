import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
    globalSetup: './src/shared/test-utils/globalSetup.ts',
    preset: 'ts-jest',
    slowTestThreshold: 15,
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    verbose: false,
}

module.exports = config
