export const randomObjectValue = <TObject extends Record<string, unknown>>(record: TObject): TObject[keyof TObject] => {
    const values = Object.values(record)

    return values[Math.floor(Math.random() * values.length)] as TObject[keyof TObject]
}
