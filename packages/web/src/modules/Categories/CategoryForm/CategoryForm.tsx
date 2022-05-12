import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    ColorSwatch,
    Text,
    TextInput,
    useMantineTheme,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import * as React from 'react'
import {
    Controller,
    useController,
    useForm,
} from 'react-hook-form'

import { IconPicker } from '../../../components'
import { extractFormFieldErrors } from '../../../utils'
import { createCategoryFormValidation } from '../CreateCategory/CreateCategory.validation'

import type {
    CategoryFormProps,
    CategoryFormValueType,
} from './CategoryForm.types'

const DEFAULT_VALUE: CategoryFormValueType = {
    color: 'orange',
    icon: '',
    name: '',
}

export const CategoryForm: React.FunctionComponent<CategoryFormProps> = (props) => {
    const {
        value = DEFAULT_VALUE,
        onSubmit: onSubmitProp,
        submitButton,
        formId,
    } = props

    const theme = useMantineTheme()

    const {
        control,
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<CategoryFormValueType>({
        defaultValues: value,
        resolver: zodResolver(createCategoryFormValidation),
    })

    const colorField = useController({ control, name: 'color' })

    const onSubmit = (formValue: CategoryFormValueType) => {
        onSubmitProp(formValue)

        reset(DEFAULT_VALUE)
    }

    return (
        <Box
            component="form"
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
            }}
        >
            <TextInput
                {...register('name')}
                {...extractFormFieldErrors(formState.errors.name)}
                label="Name"
                placeholder="Enter a name"
            />
            <Controller
                control={control}
                name="icon"
                render={(controller) => {
                    return (
                        <IconPicker
                            {...extractFormFieldErrors(formState.errors.name)}
                            color={colorField.field.value}
                            onChange={controller.field.onChange}
                            value={controller.field.value}
                        />
                    )
                }}
            />
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                }}
            >
                <Text>
                    Color
                </Text>
                <Box
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                    }}
                >
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
                                    {
                                        colorField.field.value === color
                                            ? (
                                                <IconCheck
                                                    color="#ffffff"
                                                    size={16}
                                                />
                                            )
                                            : null
                                    }
                                </ColorSwatch>
                            )
                        })}
                </Box>
                {colorField.fieldState.error?.message ? (
                    <Text
                        style={{
                            color: 'red',
                            fontSize: '14px',
                        }}
                    >
                        {colorField.fieldState.error.message}
                    </Text>
                ) : null}
            </Box>
            {submitButton}
        </Box>
    )
}
