import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    Input,
    Stack,
    TextInput,
} from '@mantine/core'
import {
    Controller,
    useForm,
} from 'react-hook-form'
import { v4 as UUID } from 'uuid'

import { extractFormFieldErrors } from '../../../shared/utils'

import type {
    KeywordFormProps,
    KeywordFormType,
} from './KeywordForm.types'
import { keywordValidation } from './KeywordForm.validation'

export const KeywordForm: React.FunctionComponent<KeywordFormProps> = (props) => {
    const {
        onCancel,
        onSubmit,
        value,
    } = props

    const { control, handleSubmit } = useForm<KeywordFormType>({
        defaultValues: {
            id: value?.id ?? UUID(),
            name: value?.name ?? '',
        },
        resolver: zodResolver(keywordValidation),
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Controller
                    control={control}
                    name="name"
                    render={(controller) => {
                        return (
                            <Input.Wrapper
                                {...extractFormFieldErrors(controller.fieldState.error)}
                                label="Name"
                            >
                                <TextInput
                                    onChange={(newValue) => {
                                        controller.field.onChange(newValue)
                                    }}
                                    placeholder="Enter a name"
                                    value={controller.field.value}
                                />
                            </Input.Wrapper>
                        )
                    }}
                />
                <Box
                    sx={{
                        columnGap: '10px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        onClick={onCancel}
                        variant="subtle"
                    >
                        Cancel
                    </Button>
                    <Button type="submit">
                        {value ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Stack>
        </form>
    )
}
