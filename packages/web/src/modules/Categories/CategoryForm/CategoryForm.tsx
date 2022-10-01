import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    SimpleGrid,
    Stack,
    TextInput,
    useMantineTheme,
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
    CategoryFormType,
} from './CategoryForm.types'
import { categoryValidation } from './CategoryForm.validation'
import { CategoryFormColors } from './CategoryFormColors'
import { CategoryFormKeywords } from './CategoryFormKeywords'

export const CategoryForm: React.FunctionComponent<CategoryFormProps> = (props) => {
    const {
        onCancel: onCancelProp,
        onDelete,
        onUpdate: onSubmitProp,
        value,
    } = props

    const theme = useMantineTheme()

    const form = useForm<CategoryFormType>({
        defaultValues: {
            color: value?.color ?? 'red',
            icon: value?.icon ?? '',
            keywords: value?.keywords ?? [],
            name: value?.name ?? '',
        },
        resolver: zodResolver(categoryValidation),
    })

    const { field: colorField } = useController({ control: form.control, name: 'color' })

    const onSubmit = async (formValue: CategoryFormType) => {
        await onSubmitProp(formValue)

        form.reset()
    }

    const onCancel = () => {
        form.reset()

        onCancelProp()
    }

    return (
        <Stack>
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
                            color={theme.colors[colorField.value]?.[6]}
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
            <SimpleGrid
                cols={value ? 3 : 2}
                sx={{ marginTop: theme.spacing.xl }}
            >
                {value ? (
                    <Button
                        color="red"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                ) : null}
                <Button
                    onClick={onCancel}
                    variant="default"
                >
                    Cancel
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)}>
                    Save
                </Button>
            </SimpleGrid>
        </Stack>
    )
}
