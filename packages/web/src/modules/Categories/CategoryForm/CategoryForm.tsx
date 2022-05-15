import { zodResolver } from '@hookform/resolvers/zod'
import {
    ActionIcon,
    Badge,
    Box,
    ColorSwatch,
    Modal,
    Text,
    TextInput,
    useMantineTheme,
} from '@mantine/core'
import {
    IconCheck,
    IconPlus,
    IconX,
} from '@tabler/icons'
import * as React from 'react'
import {
    Controller,
    useController,
    useForm,
} from 'react-hook-form'

import { IconPicker } from '../../../components'
import {
    extractFormFieldErrors,
    useBoolean,
} from '../../../utils'
import { createCategoryFormValidation } from '../CreateCategory/CreateCategory.validation'
import { KeywordForm } from '../KeywordForm'

import type {
    CategoryFormProps,
    CategoryFormValueType,
} from './CategoryForm.types'

const DEFAULT_VALUE: CategoryFormValueType = {
    color: 'orange',
    icon: '',
    keywords: [],
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

    const [isKeywordDialogOpen, isKeywordDialogOpenActions] = useBoolean(false)

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
    const keywordsField = useController({ control, name: 'keywords' })

    const onSubmit = (formValue: CategoryFormValueType) => {
        onSubmitProp(formValue)

        reset(DEFAULT_VALUE)
    }

    const onKeywordRemove = (id: string) => {
        return () => {
            const filteredList = keywordsField.field.value.filter((keyword) => {
                return keyword.id !== id
            })

            keywordsField.field.onChange(filteredList)
        }
    }

    return (
        <>
            <Box
                component="form"
                id={formId}
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '25px',
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
                                                        size={15}
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
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '10px',
                    }}
                >
                    <Box
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text>
                            Keywords
                        </Text>
                        <ActionIcon
                            color="dark"
                            onClick={isKeywordDialogOpenActions.setTrue}
                            size={30}
                            variant="default"
                        >
                            <IconPlus />
                        </ActionIcon>
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            flexFlow: 'wrap',
                            gap: '5px',
                        }}
                    >
                        {
                            keywordsField.field.value.length > 0
                                ? keywordsField.field.value.map((keyword) => {
                                    return (
                                        <Badge
                                            color="gray"
                                            key={keyword.name}
                                            rightSection={(
                                                <ActionIcon
                                                    color="blue"
                                                    onClick={onKeywordRemove(keyword.id)}
                                                    radius="xl"
                                                    size="xs"
                                                    variant="transparent"
                                                >
                                                    <IconX size={10} />
                                                </ActionIcon>
                                            )}
                                            size="sm"
                                        >
                                            {keyword.name}
                                        </Badge>
                                    )
                                })
                                : (
                                    <Text
                                        color="dimmed"
                                        size="xs"
                                    >
                                        No keywords
                                    </Text>
                                )
                        }
                    </Box>
                </Box>
                {React.cloneElement(submitButton, {
                    style: {
                        marginTop: '10px',
                    },
                })}
            </Box>
            {isKeywordDialogOpen ? (
                <Modal
                    centered={true}
                    onClose={isKeywordDialogOpenActions.setFalse}
                    opened={isKeywordDialogOpen}
                    title="Add Category"
                    zIndex={999}
                >
                    <KeywordForm
                        onCancel={isKeywordDialogOpenActions.setFalse}
                        onSubmit={((formValue) => {
                            keywordsField.field.onChange([
                                ...keywordsField.field.value,
                                formValue,
                            ])

                            isKeywordDialogOpenActions.setFalse()
                        })}
                    />
                </Modal>
            ) : null}
        </>

    )
}
