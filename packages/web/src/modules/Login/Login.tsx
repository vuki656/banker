import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
    IconAt,
    IconLock,
} from '@tabler/icons'
import { setCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { useLoginUserMutation } from '../../graphql/types.generated'
import {
    COOKIE_TOKEN_NAME,
    extractFormFieldErrors,
} from '../../utils'

import type { LoginFormValueType } from './Login.types'
import { loginFormValidationSchema } from './Login.validation'

const ICON_SIZE = 17

export const Login: React.FunctionComponent = () => {
    const router = useRouter()

    const [loginUserMutation, { loading }] = useLoginUserMutation({
        onCompleted: (response) => {
            setCookies(COOKIE_TOKEN_NAME, response.loginUser.token)

            void router.push('/breakdown')
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Login Failed',
                title: 'Error',
            })
        },
    })

    const { formState, handleSubmit, register } = useForm<LoginFormValueType>({
        resolver: zodResolver(loginFormValidationSchema),
    })

    const onSubmit = (formValue: LoginFormValueType) => {
        void loginUserMutation({
            variables: {
                input: {
                    email: formValue.email,
                    password: formValue.password,
                },
            },
        })
    }

    return (
        <Stack
            align="center"
            justify="center"
            style={{ height: '100%' }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    sx={(theme) => ({
                        border: `1px solid ${theme.colors.gray[3]}`,
                        borderRadius: '5px',
                        padding: theme.spacing.xl,
                    })}
                >
                    <Text
                        align="center"
                        size="lg"
                        weight="bold"
                    >
                        Login
                    </Text>
                    <TextInput
                        {...register('email')}
                        {...extractFormFieldErrors(formState.errors.email)}
                        icon={<IconAt size={ICON_SIZE} />}
                        placeholder="Your email"
                    />
                    <PasswordInput
                        {...register('password')}
                        {...extractFormFieldErrors(formState.errors.password)}
                        icon={<IconLock size={ICON_SIZE} />}
                        placeholder="Your password"
                    />
                    <Button
                        loading={loading}
                        type="submit"
                    >
                        Login
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}
