import {
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'
import dayjs from 'dayjs'
import * as React from 'react'

import { Icons } from '../../../components'

import type { TransactionProps } from './Transaction.types'

export const Transaction: React.FunctionComponent<TransactionProps> = (props) => {
    const {
        onClick,
        value,
    } = props

    return (
        <UnstyledButton
            onClick={onClick}
            sx={(theme) => ({
                '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                },
                alignItems: 'center',
                borderRadius: theme.radius.sm,
                boxShadow: theme.shadows.xs,
                columnGap: theme.spacing.md,
                display: 'grid',
                gridTemplateColumns: '0.2fr 0.2fr 0.1fr 0.5fr',
                padding: theme.spacing.xs,
            })}
        >
            <Group>
                <ThemeIcon
                    color={value.category?.color}
                    size="md"
                    variant="light"
                >
                    <Icons
                        name={value.category?.icon}
                        size={21}
                    />
                </ThemeIcon>
                <Text
                    color={value.category?.color}
                    size="sm"
                    weight={500}
                >
                    {value.category?.name}
                </Text>
            </Group>
            <Text size="sm">
                {dayjs(value.date).format('DD.MM.YYYY')}
            </Text>
            <Text
                size="sm"
                sx={(theme) => {
                    let color = theme.colors.green

                    if (value.amount >= 100) {
                        color = theme.colors.orange
                    }

                    if (value.amount >= 500) {
                        color = theme.colors.red
                    }

                    return {
                        color,
                    }
                }}
                weight="bold"
            >
                {`${value.amount} ${value.currency}`}
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
                {value.description}
            </Text>
        </UnstyledButton>
    )
}
