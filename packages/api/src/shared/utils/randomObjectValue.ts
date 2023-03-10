export const randomObjectValue = <T extends Record<string, unknown>>(record: T): T[keyof T] => {
    const values = Object.values(record)

    return values[Math.floor(Math.random() * values.length)] as T[keyof T]
}
