/**
 * Checks for NodeJS specific global variables and API`s
 *
 */
export function isServerExecutionEnvironment(): boolean {
    return typeof process !== 'undefined' && Boolean(process.version)
}

/**
 * Checks for browser specific global variables and API`s
 *
 */
export function isBrowserExecutionEnvironment(): boolean {
    return typeof window !== 'undefined' || typeof self !== 'undefined'
}
