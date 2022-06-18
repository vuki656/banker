import dayjs from "dayjs"

export const formatDate = (date?: Date | string) => {
    return dayjs(date).format('DD.MM.YYYY')
}
