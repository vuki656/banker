import type { NumberInputProps } from '@mantine/core'
import { NumberInput } from '@mantine/core'

export const MoneyInput: React.FunctionComponent<NumberInputProps> = (props) => {
    const { ...other } = props

    return (
        <NumberInput
            {...other}
            formatter={(newValue) => {
                if (Number.isNaN(Number.parseFloat(newValue ?? ''))) {
                    return ''
                }

                // eslint-disable-next-line unicorn/no-unsafe-regex
                return `${newValue}`.replace(/\B(?=(\d{3})+(?!\d))/gu, ',')
            }}
            parser={(newValue) => {
                return newValue?.replace(/\$\s?|(,*)/gu, '')
            }}
            precision={2}
        />
    )
}
