export const randomEnumValue = (enumeration: any) => {
    const values = Object.keys(enumeration)
    const enumKey = values[Math.floor(Math.random() * values.length)]

    return enumeration[enumKey as any]
}

export const randomObjectValue = (object: Record<string, string>) => {
    const keys = Object.keys(object)
    const index = Math.floor(keys.length * Math.random())

    // @ts-expect-error
    return object[keys[index]]
}
