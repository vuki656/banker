export type RangeSelectValue = {
    endDate: Date
    startDate: Date
}

export type RangeSelectProps = {
    onSubmit(value: RangeSelectValue): void
    value: RangeSelectValue
}
