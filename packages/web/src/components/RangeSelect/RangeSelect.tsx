import {
    Button,
    Group,
    Modal,
    Stack,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons'
import dayjs from 'dayjs'
import { useState } from 'react'

import { useBoolean } from '../../shared/hooks'
import { formatDate } from '../../shared/utils'

import type { RangeSelectProps } from './RangeSelect.types'

export const RangeSelect = (props: RangeSelectProps) => {
    const {
        onSubmit,
        range,
        value: valueProp
    } = props

    const [isOpen, isOpenActions] = useBoolean()
    const [value, setValue] = useState<[Date | null, Date | null]>(valueProp ?? [null, null])

    // TODO: this is stupid, reimplement
    const onCustomRangeSelect = () => {
        if (!value[0] || !value[1]) {
            return
        }

        onSubmit({
            endDate: value[1],
            startDate: value[0],
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
                onClick={isOpenActions.setTrue}
                rightIcon={<IconCalendar size={16} />}
            >
                {`${formatDate(range.startDate)} - ${formatDate(range.endDate)}`}
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
                    <DatePicker
                        numberOfColumns={2}
                        type='range'
                        maxDate={dayjs().toDate()}
                        onChange={setValue}
                        value={value}
                    />
                    <Button onClick={onCustomRangeSelect}>Confirm</Button>
                </Group>
            </Modal>
        </>
    )
}
