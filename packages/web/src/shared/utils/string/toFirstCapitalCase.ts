export const toFirstCapitalCase = (word: string) => {
    const normalized = word.toLowerCase()

    return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}
