import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    TextInput,
} from '@mantine/core'
import {
    Controller,
    FormProvider,
    useController,
    useForm,
} from 'react-hook-form'

import { IconPicker } from '../../../components'
import { extractFormFieldErrors } from '../../../utils'

import type {
    CategoryFormProps,
    CategoryFormValueType,
} from './CategoryForm.types'
import { categoryValidation } from './CategoryForm.validation'
import { CategoryFormColors } from './CategoryFormColors'
import { CategoryFormKeywords } from './CategoryFormKeywords'

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

    const form = useForm<CategoryFormValueType>({
        defaultValues: value,
        resolver: zodResolver(categoryValidation),
    })

    const colorField = useController({ control: form.control, name: 'color' })

    const onSubmit = async (formValue: CategoryFormValueType) => {
        await onSubmitProp(formValue)

        form.reset(DEFAULT_VALUE)
    }

    return (
        <Box
            component="form"
            id={formId}
            onSubmit={form.handleSubmit(onSubmit)}
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                rowGap: theme.spacing.md,
            })}
        >
            <TextInput
                {...form.register('name')}
                {...extractFormFieldErrors(form.formState.errors.name)}
                label="Name"
                placeholder="Enter a name"
                required={true}
            />
            <Controller
                control={form.control}
                name="icon"
                render={(controller) => {
                    return (
                        <IconPicker
                            {...extractFormFieldErrors(controller.formState.errors.icon)}
                            color={colorField.field.value}
                            onChange={controller.field.onChange}
                            required={true}
                            value={controller.field.value}
                        />
                    )
                }}
            />
            <FormProvider {...form}>
                <CategoryFormColors />
                <CategoryFormKeywords />
            </FormProvider>
            {submitButton}
        </Box>

    )
}
