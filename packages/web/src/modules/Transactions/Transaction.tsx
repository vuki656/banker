import {
    Box,
    Group,
    Paper,
    ThemeIcon,
    Text
} from '@mantine/core'
import dayjs from 'dayjs'
import * as React from 'react'

import { Icons } from '../../components'

import type { TransactionProps } from './Transaction.types'

export const Transaction: React.FunctionComponent<TransactionProps> = (props) => {
    const {
        transaction,
    } = props

    return (
        <Paper
            key={transaction.id}
            shadow="xs"
        >
            <Box
                sx={(theme) => ({
                    alignItems: 'center',
                    columnGap: theme.spacing.md,
                    display: 'grid',
                    gridTemplateColumns: '0.2fr 0.2fr 0.1fr 0.5fr',
                    padding: theme.spacing.xs,
                })}
            >
                <Group>
                    <ThemeIcon
                        color={transaction.category?.color}
                        size="md"
                        variant="light"
                    >
                        <Icons
                            name={transaction.category?.icon}
                            size={21}
                        />
                    </ThemeIcon>
                    <Text
                        color={transaction.category?.color}
                        size="sm"
                        weight={500}
                    >
                        {transaction.category?.name}
                    </Text>
                </Group>
                <Text size="sm">
                    {dayjs(transaction.date).format('MM:HH DD.MM.YYYY')}
                </Text>
                <Text
                    size="sm"
                    sx={(theme) => {
                        let color = theme.colors.green

                        if (transaction.amount > 300) {
                            color = theme.colors.orange
                        }

                        if (transaction.amount > 500) {
                            color = theme.colors.red
                        }

                        return {
                            color,
                        }
                    }}
                    weight="bold"
                >
                    {`${transaction.amount} ${transaction.currency}`}
                </Text>
                <Text
                    color="dimmed"
                    size="sm"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    weight={500}
                >
                    {transaction.description}
                </Text>
            </Box>
        </Paper>
    )
}
