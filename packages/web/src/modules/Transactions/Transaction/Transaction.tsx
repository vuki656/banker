import {
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'

import {
    HighlightedCurrency,
    Icons,
} from '../../../components'
import { formatDate } from '../../../shared/utils'

import type { TransactionProps } from './Transaction.types'

export const Transaction: React.FunctionComponent<TransactionProps> = (props) => {
    const {
        onClick,
        transaction: value,
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
                backgroundColor: theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.white,
                borderRadius: theme.radius.sm,
                boxShadow: theme.shadows.xs,
                columnGap: theme.spacing.md,
                display: 'grid',
                gridTemplateColumns: '250px 50px 0.2fr 1fr',
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
                {formatDate(value.date)}
            </Text>
            <HighlightedCurrency amount={value.amount.converted} />
            <Text
                color="dimmed"
                ml={30}
                size="sm"
                sx={{
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
