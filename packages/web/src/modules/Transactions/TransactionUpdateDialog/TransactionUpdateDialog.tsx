import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    Modal,
    Select,
    SimpleGrid,
    Stack,
    Textarea,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import {
    Controller,
    useForm,
} from 'react-hook-form'

import { MoneyInput } from '../../../components'
import {
    useDeleteTransactionMutation,
    useGetCategoriesQuery,
    useUpdateTransactionMutation,
} from '../../../graphql/types.generated'
import {
    CURRENCIES,
    extractFormFieldErrors,
} from '../../../utils'

import type {
    TransactionUpdateDialogProps,
    TransactionUpdateFormValue,
} from './TransactionUpdateDialog.types'
import { transactionUpdateValidation } from './TransactionUpdateDialog.validation'

export const TransactionUpdateDialog: React.FunctionComponent<TransactionUpdateDialogProps> = (props) => {
    const {
        isOpen,
        onCancel: onCancelProp,
        onSubmit: onSubmitProp,
        value,
    } = props

    const [deleteTransactionMutation, { loading: deleteLoading }] = useDeleteTransactionMutation({
        onCompleted: () => {
            onSubmitProp()

            showNotification({
                color: 'green',
                message: 'Transaction deleted',
                title: 'Success',
            })
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to delete transaction',
                title: 'Error',
            })
        },
    })

    const { data: categoriesData } = useGetCategoriesQuery({
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to fetch categories',
                title: 'Error',
            })
        },
    })

    const [updateTransactionMutation, { loading: updateLoading }] = useUpdateTransactionMutation({
        onCompleted: () => {
            onSubmitProp()

            showNotification({
                color: 'green',
                message: 'Transaction updated',
                title: 'Success',
            })
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to update transaction',
                title: 'Error',
            })
        },
    })

    const {
        control,
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<TransactionUpdateFormValue>({
        defaultValues: {
            amount: value.amount,
            categoryId: value.category?.id ?? '',
            currency: value.currency,
            date: value.date,
            description: value.description,
        },
        resolver: zodResolver(transactionUpdateValidation),
    })

    const onSubmit = (formValue: TransactionUpdateFormValue) => {
        void updateTransactionMutation({
            variables: {
                input: {
                    amount: formValue.amount,
                    categoryId: formValue.categoryId,
                    currency: formValue.currency,
                    date: formValue.date,
                    description: formValue.description,
                    id: value.id,
                },
            },
        })
    }

    const onDelete = () => {
        void deleteTransactionMutation({
            variables: {
                input: {
                    id: value.id,
                },
            },
        })
    }

    const onCancel = () => {
        reset()

        onCancelProp()
    }

    return (
        <Modal
            centered={true}
            onClose={onCancel}
            opened={isOpen}
            radius="md"
            size="lg"
            title="Update Transaction"
            withCloseButton={true}
        >
            <Stack>
                <Box
                    sx={(theme) => ({
                        columnGap: theme.spacing.sm,
                        display: 'grid',
                        gridTemplateColumns: '0.7fr 0.3fr',
                        justifyContent: 'center',
                    })}
                >
                    <Controller
                        control={control}
                        name="amount"
                        render={(controller) => {
                            return (
                                <MoneyInput
                                    {...extractFormFieldErrors(formState.errors.amount)}
                                    label="Amount"
                                    onChange={(newValue) => {
                                        controller.field.onChange(newValue)
                                    }}
                                    placeholder="Enter an amount"
                                    value={controller.field.value}
                                />
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        name="currency"
                        render={(controller) => {
                            return (
                                <Select
                                    data={CURRENCIES}
                                    label="Currency"
                                    onChange={controller.field.onChange}
                                    value={controller.field.value}
                                />
                            )
                        }}
                    />
                </Box>
                <Controller
                    control={control}
                    name="categoryId"
                    render={(controller) => {
                        return (
                            <Select
                                {...extractFormFieldErrors(formState.errors.categoryId)}
                                clearable={true}
                                data={categoriesData?.categories.map((category) => {
                                    return {
                                        label: category.name,
                                        value: category.id,
                                    }
                                }) ?? []}
                                label="Category"
                                onChange={(newValue) => {
                                    controller.field.onChange(newValue)
                                }}
                                placeholder="Select a category"
                                value={controller.field.value}
                            />
                        )
                    }}
                />
                <Controller
                    control={control}
                    name="date"
                    render={(controller) => {
                        return (
                            <DatePicker
                                clearable={false}
                                label="Date"
                                maxDate={new Date()}
                                onChange={(newValue) => {
                                    controller.field.onChange(newValue)
                                }}
                                placeholder="Pick date"
                                value={new Date(controller.field.value)}
                            />
                        )
                    }}
                />
                <Textarea
                    label="Description"
                    minRows={4}
                    {...register('description')}
                />
                <SimpleGrid cols={3}>
                    <Button
                        color="red"
                        loading={deleteLoading}
                        onClick={onDelete}
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={onCancel}
                        variant="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={updateLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save
                    </Button>
                </SimpleGrid>
            </Stack>
        </Modal>
    )
}
