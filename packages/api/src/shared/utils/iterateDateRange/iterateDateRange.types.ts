export type DateRangeParams = {
  callback(date: Date): Promise<void>
  endDate: Date
  startDate: Date
}
