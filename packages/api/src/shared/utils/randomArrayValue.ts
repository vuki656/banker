export const randomArrayValue = <TValue>(array: TValue[]): TValue => {
    if (array.length === 0) {
        throw new Error('Array is empty')
    }

    const randomIndex = Math.floor(Math.random() * array.length)

    const value = array[randomIndex]

    if (!value) {
        throw new Error('No value found')
    }

    return value
}
