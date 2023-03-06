import {
    ColorSwatch,
    Group,
    Input,
    useMantineTheme,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useController } from 'react-hook-form'

import type { CategoryFormType } from './CategoryForm.types'

export const CategoryFormColors: React.FunctionComponent = () => {
    const theme = useMantineTheme()

    const colorField = useController<CategoryFormType>({ name: 'color' })

    return (
        <Input.Wrapper
            error={colorField.fieldState.error?.message}
            label="Color"
            required={true}
        >
            <Group spacing="xs">
                {Object
                    .keys(theme.colors)
                    .map((color) => {
                        return (
                            <ColorSwatch
                                color={theme.colors[color]?.[6] ?? theme.white}
                                key={color}
                                onClick={() => {
                                    colorField.field.onChange(color)
                                }}
                                styles={{
                                    root: {
                                        ':hover': {
                                            cursor: 'pointer',
                                        },
                                    },
                                }}
                            >
                                {colorField.field.value === color ? (
                                    <IconCheck
                                        color="#ffffff"
                                        size={15}
                                    />
                                ) : null}
                            </ColorSwatch>
                        )
                    })}
            </Group>
        </Input.Wrapper>
    )
}
