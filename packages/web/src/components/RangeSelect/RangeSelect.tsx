import {
    Button,
    Group,
    Modal,
    Stack,
} from '@mantine/core'
import { RangeCalendar } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons'
import dayjs from 'dayjs'
import type { FunctionComponent } from 'react'

import { formatDate, useBoolean } from '../../utils'

import type { RangeSelectProps } from './RangeSelect.types'

export const RangeSelect: FunctionComponent<RangeSelectProps> = ((props) => {
    const {
        loading,
        onSubmit,
        value,
    } = props

    const [isOpen, isOpenActions] = useBoolean()

    const onDateChange = (newDateRange: [Date, Date | null]) => {
        const startDate = newDateRange[0]
        const endDate = newDateRange[1]

        if (!endDate) {
            return
        }

        onSubmit({
            endDate,
            startDate,
        })

        isOpenActions.setFalse()
    }

    const onThisMonthClick = () => {
        onSubmit({
            endDate: dayjs().toDate(),
            startDate: dayjs()
                .startOf('month')
                .toDate(),
        })

        isOpenActions.setFalse()
    }

    const onLastMonthClick = () => {
        onSubmit({
            endDate: dayjs()
                .subtract(1, 'month')
                .endOf('month')
                .toDate(),
            startDate: dayjs()
                .subtract(1, 'month')
                .startOf('month')
                .toDate(),
        })

        isOpenActions.setFalse()
    }

    const onLastThreeMonthsClick = () => {
        onSubmit({
            endDate: dayjs()
                .endOf('month')
                .toDate(),
            startDate: dayjs()
                .subtract(2, 'month')
                .startOf('month')
                .toDate(),
        })

        isOpenActions.setFalse()
    }

    const onLastSixMonthsClick = () => {
        onSubmit({
            endDate: dayjs()
                .endOf('month')
                .toDate(),
            startDate: dayjs()
                .subtract(5, 'month')
                .startOf('month')
                .toDate(),
        })

        isOpenActions.setFalse()
    }

    const onLastTwelveMonthsClick = () => {
        onSubmit({
            endDate: dayjs()
                .endOf('month')
                .toDate(),
            startDate: dayjs()
                .subtract(11, 'month')
                .startOf('month')
                .toDate(),
        })

        isOpenActions.setFalse()
    }

    const onLastThirtyDaysClick = () => {
        onSubmit({
            endDate: dayjs().toDate(),
            startDate: dayjs()
                .subtract(30, 'days')
                .toDate(),
        })

        isOpenActions.setFalse()
    }

    return (
        <>
            <Button
                loading={loading}
                onClick={isOpenActions.setTrue}
                rightIcon={<IconCalendar size={16} />}
            >
                {`${formatDate(value.startDate)} - ${formatDate(value.endDate)}`}
            </Button>
            <Modal
                onClose={isOpenActions.setFalse}
                opened={isOpen}
                size="xl"
                title="Select Date Range"
            >
                <Group spacing="xl">
                    <Stack>
                        <Button
                            color="blue"
                            onClick={onLastThirtyDaysClick}
                            variant="subtle"
                        >
                            Last 30 Days
                        </Button>
                        <Button
                            color="blue"
                            onClick={onThisMonthClick}
                            variant="subtle"
                        >
                            This Month
                        </Button>
                        <Button
                            color="blue"
                            onClick={onLastMonthClick}
                            variant="subtle"
                        >
                            Last Month
                        </Button>
                        <Button
                            color="blue"
                            onClick={onLastThreeMonthsClick}
                            variant="subtle"
                        >
                            Last 3 Months
                        </Button>
                        <Button
                            color="blue"
                            onClick={onLastSixMonthsClick}
                            variant="subtle"
                        >
                            Last 6 Months
                        </Button>
                        <Button
                            color="blue"
                            onClick={onLastTwelveMonthsClick}
                            variant="subtle"
                        >
                            Last 12 Months
                        </Button>
                    </Stack>
                    <RangeCalendar
                        amountOfMonths={2}
                        maxDate={dayjs().toDate()}
                        onChange={onDateChange}
                        value={[value.startDate, value.endDate]}
                    />
                </Group>
            </Modal>
        </>
    )
})
