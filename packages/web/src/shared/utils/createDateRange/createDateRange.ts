import dayjs from 'dayjs'

export const createDateRange = (start: Date, end: Date) => {
    const dates: Date[] = []

    let currentDate = dayjs(start)

    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
        currentDate = currentDate.add(1, 'day')

        dates.push(currentDate.toDate())
    }

    return dates
}
