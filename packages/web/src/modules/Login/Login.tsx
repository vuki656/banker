import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    PasswordInput,
    Text,
    TextInput,
    useMantineTheme,
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

import type { LoginFormValuesType } from './Login.types'
import { loginFormValidationSchema } from './Login.validation'

export const Login: React.FunctionComponent = () => {
    const theme = useMantineTheme()
    const router = useRouter()

    const [loginUserMutation, { loading }] = useLoginUserMutation({
        onCompleted: (response) => {
            setCookies(COOKIE_TOKEN_NAME, response.loginUser.token)

            void router.push('/home')
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Login Failed',
                title: 'Error',
            })
        },
    })

    const { formState, handleSubmit, register } = useForm<LoginFormValuesType>({
        resolver: zodResolver(loginFormValidationSchema),
    })

    const onSubmit = (formValues: LoginFormValuesType) => {
        void loginUserMutation({
            variables: {
                input: {
                    email: formValues.email,
                    password: formValues.password,
                },
            },
        })
    }

    return (
        <Box
            style={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                rowGap: '10px',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    border: `1px solid ${theme.colors.gray[3]}`,
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    rowGap: '10px',
                }}
            >
                <Text
                    style={{
                        fontSize: '25px',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}
                >
                    Login
                </Text>
                <TextInput
                    {...register('email')}
                    {...extractFormFieldErrors(formState.errors.email)}
                    icon={<IconAt />}
                    placeholder="Your email"
                />
                <PasswordInput
                    {...register('password')}
                    {...extractFormFieldErrors(formState.errors.password)}
                    icon={<IconLock />}
                    placeholder="Your password"
                />
                <Button
                    loading={loading}
                    type="submit"
                >
                    Login
                </Button>
            </Box>
        </Box>
    )
}
