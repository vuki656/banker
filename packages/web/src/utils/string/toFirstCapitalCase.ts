export const toFirstCapitalCase = (value: string) => {
    const normalized = value.toLowerCase()

    return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}
