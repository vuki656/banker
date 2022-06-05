import {
    Button,
    Group,
    Modal,
    Stack,
} from '@mantine/core'
import { RangeCalendar } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { IconCalendar } from '@tabler/icons'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

import { useGetTransactionsLazyQuery } from '../../../graphql/types.generated'
import { useBoolean } from '../../../utils'
import { useBreakdownStore } from '../hooks'

export const BreakdownRangeSelect = observer(() => {
    const store = useBreakdownStore()

    const [isOpen, isOpenActions] = useBoolean()

    const [getTransactions, { loading }] = useGetTransactionsLazyQuery({
        onCompleted: (response) => {
            store.transactions = response.transactions
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Unable to get transactions',
                title: 'Error',
            })
        },
        variables: {
            args: {
                endDate: store.range.end.toISOString(),
                startDate: store.range.start.toISOString(),
            },
        },
    })

    const onDateChange = (newDateRange: [Date, Date | null]) => {
        const startDate = newDateRange[0]
        const endDate = newDateRange[1]

        if (!endDate) {
            return
        }

        store.setRange([startDate, endDate])

        isOpenActions.setFalse()

        void getTransactions()
    }

    const onThisMonthClick = () => {
        store.setRange([
            dayjs()
                .startOf('month')
                .toDate(),
            dayjs().toDate(),
        ])

        isOpenActions.setFalse()

        void getTransactions()
    }

    const onLastMonthClick = () => {
        store.setRange([
            dayjs()
                .subtract(1, 'month')
                .startOf('month')
                .toDate(),
            dayjs()
                .subtract(1, 'month')
                .endOf('month')
                .toDate(),
        ])

        isOpenActions.setFalse()

        void getTransactions()
    }

    const onLastThreeMonthsClick = () => {
        store.setRange([
            dayjs()
                .subtract(2, 'month')
                .startOf('month')
                .toDate(),
            dayjs()
                .endOf('month')
                .toDate(),
        ])

        isOpenActions.setFalse()

        void getTransactions()
    }

    const onLastSixMonthsClick = () => {
        store.setRange([
            dayjs()
                .subtract(5, 'month')
                .startOf('month')
                .toDate(),
            dayjs()
                .endOf('month')
                .toDate(),
        ])

        isOpenActions.setFalse()

        void getTransactions()
    }

    const onLastTwelveMonthsClick = () => {
        store.setRange([
            dayjs()
                .subtract(11, 'month')
                .startOf('month')
                .toDate(),
            dayjs()
                .endOf('month')
                .toDate(),
        ])

        isOpenActions.setFalse()

        void getTransactions()
    }

    return (
        <>
            <Button
                loading={loading}
                onClick={isOpenActions.setTrue}
                rightIcon={<IconCalendar size={16} />}
            >
                {`${dayjs(store.range.start).format('DD.MM.YYYY')} - ${dayjs(store.range.end).format('DD.MM.YYYY')}`}
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
                        value={store.rangeValue}
                    />
                </Group>
            </Modal>
        </>
    )
})
