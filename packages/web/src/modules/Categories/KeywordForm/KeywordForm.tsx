import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    TextInput,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { v4 as UUID } from 'uuid'

import { extractFormFieldErrors } from '../../../utils'

import type {
    KeywordFormProps,
    KeywordFormValueType,
} from './KeywordForm.types'
import { keywordValidation } from './KeywordForm.validation'

const FORM_ID = 'keyword-form'

export const KeywordForm: React.FunctionComponent<KeywordFormProps> = (props) => {
    const {
        onCancel: onCancelProp,
        onSubmit: onSubmitProps,
    } = props

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<KeywordFormValueType>({
        defaultValues: {
            id: UUID(),
        },
        resolver: zodResolver(keywordValidation),
    })

    const onSubmit = (formValue: KeywordFormValueType) => {
        onSubmitProps(formValue)

        reset()
    }

    const onCancel = () => {
        onCancelProp()

        reset()
    }

    return (
        <Box
            component="form"
            id={FORM_ID}
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
            />
            <Box
                style={{
                    columnGap: '10px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    color="dark"
                    onClick={onCancel}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button
                    form={FORM_ID}
                    type="submit"
                >
                    Add
                </Button>
            </Box>
        </Box>
    )
}
