export type RangeSelectValue = {
    endDate: Date
    startDate: Date
}

export type RangeSelectProps = {
    loading: boolean
    onSubmit(value: RangeSelectValue): void
    value: RangeSelectValue
}
