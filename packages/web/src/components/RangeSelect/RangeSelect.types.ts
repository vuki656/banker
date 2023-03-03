export type RangeSelectValue = {
    endDate: Date 
    startDate: Date 
}

export type RangeSelectProps = {
    onSubmit(range: RangeSelectValue): void
    range: RangeSelectValue
    value?: [Date, Date]
}
