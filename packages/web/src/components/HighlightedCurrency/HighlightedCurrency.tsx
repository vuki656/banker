import { Text } from '@mantine/core'

import { useCurrentUser } from '../../shared/auth'
import { formatCurrency } from '../../shared/utils'

import type { HighlightedCurrencyProps } from './HighlightedCurrency.types'

export const HighlightedCurrency = (props: HighlightedCurrencyProps) => {
    const {
        amount,
        high = 500,
        medium = 100,
    } = props

    const { user } = useCurrentUser()

    return (
        <Text
            align="right"
            size="sm"
            sx={(theme) => {
                let color = theme.colors.green

                if (amount >= medium) {
                    color = theme.colors.orange
                }

                if (amount >= high) {
                    color = theme.colors.red
                }

                return {
                    color,
                }
            }}
            weight="bold"
        >
            {formatCurrency(amount, { currency: user?.currency })}
        </Text>
    )
}
