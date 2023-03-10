import dayjs from 'dayjs'

import type { DateRangeParams } from './iterateDateRange.types'

export const iterateDateRange = async ({ callback, endDate, startDate }: DateRangeParams) => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)

    let currentDate = start

    while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
        await callback(currentDate.toDate())

        currentDate = currentDate.add(1, 'day')
    }
}
