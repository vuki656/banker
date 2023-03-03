import type { NumberInputProps } from '@mantine/core'
import { NumberInput } from '@mantine/core'

export const MoneyInput = (props: NumberInputProps) => {
    const { ...other } = props

    return (
        <NumberInput
            {...other}
            formatter={(newValue) => {
                if (Number.isNaN(Number.parseFloat(newValue))) {
                    return ''
                }

                // eslint-disable-next-line unicorn/no-unsafe-regex
                return `${newValue}`.replaceAll(/\B(?=(\d{3})+(?!\d))/gu, ',')
            }}
            parser={(newValue) => {
                return newValue.replaceAll(/\$\s?|(,*)/gu, '')
            }}
            precision={2}
        />
    )
}
