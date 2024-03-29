import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Group,
    LoadingOverlay,
    Modal,
    Select,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'

import { useUpdateUserMutation } from '../../../graphql/types.generated'
import { useCurrentUser } from '../../../shared/auth'
import { CURRENCIES } from '../../../shared/constants'
import { useBoolean } from '../../../shared/hooks'
import { extractFormFieldErrors } from '../../../shared/utils'

import type { UserFormType } from './SidebarUpdateUserDialog.validation'
import { userValidation } from './SidebarUpdateUserDialog.validation'

export const SidebarUpdateUserDialog: React.FunctionComponent = () => {
    const router = useRouter()
    const theme = useMantineTheme()

    const { user } = useCurrentUser()

    const [isOpen, openActions] = useBoolean()

    const [updateUserMutation, { loading }] = useUpdateUserMutation({
        onCompleted: (response) => {
            showNotification({
                color: 'green',
                message: 'Details updated',
                title: 'Success',
            })

            openActions.setFalse()

            if (user?.currency !== response.updateUser.user.currency) {
                router.reload()
            }
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Failed to your details',
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
    } = useForm<UserFormType>({
        defaultValues: {
            currency: user?.currency ?? 'HRK',
            email: user?.email ?? '',
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
        },
        resolver: zodResolver(userValidation),
    })

    useEffect(() => {
        reset({
            currency: user?.currency ?? 'HRK',
            email: user?.email ?? '',
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
        })
    }, [user])

    const onCancel = () => {
        reset()

        openActions.setFalse()
    }

    const onSubmit = (formValue: UserFormType) => {
        if (!user?.id) {
            throw new Error('Attempted to update user while no current user set')
        }

        void updateUserMutation({
            variables: {
                input: {
                    currency: formValue.currency,
                    email: formValue.email,
                    firstName: formValue.firstName,
                    id: user.id,
                    lastName: formValue.lastName,
                },
            },
        })
    }

    return (
        <>
            <UnstyledButton
                onClick={openActions.setTrue}
                sx={{
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                    borderRadius: theme.radius.sm,
                    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                    display: 'block',
                    padding: theme.spacing.xs,
                    paddingTop: theme.spacing.md,
                    width: '100%',
                }}
            >
                <Group spacing={3}>
                    {user ? (
                        <>
                            <Text
                                size="sm"
                                weight={500}
                            >
                                {`${user.firstName} ${user.lastName}`}
                            </Text>
                            <Text
                                color="dimmed"
                                size="xs"
                            >
                                {user.email}
                            </Text>
                        </>
                    ) : (
                        <Text
                            size="sm"
                            weight={500}
                        >
                            N/A
                        </Text>
                    )}
                </Group>
            </UnstyledButton>
            <Modal
                centered={true}
                onClose={openActions.setFalse}
                opened={isOpen}
                radius="md"
                size="lg"
                title="Update Details"
                withCloseButton={true}
            >
                <LoadingOverlay visible={loading} />
                <Stack>
                    <TextInput
                        {...extractFormFieldErrors(formState.errors.firstName)}
                        {...register('firstName')}
                        label="First Name"
                    />
                    <TextInput
                        {...register('lastName')}
                        {...extractFormFieldErrors(formState.errors.lastName)}
                        label="Last Name"
                    />
                    <TextInput
                        {...register('email')}
                        {...extractFormFieldErrors(formState.errors.email)}
                        label="Email"
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
                    <SimpleGrid cols={2}>
                        <Button
                            fullWidth={true}
                            onClick={onCancel}
                            variant="default"
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth={true}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                        </Button>
                    </SimpleGrid>
                </Stack>
            </Modal>
        </>
    )
}
