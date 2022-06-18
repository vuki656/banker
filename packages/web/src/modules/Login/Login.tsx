import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Paper,
    PasswordInput,
    Stack,
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
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
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
    const theme = useMantineTheme()
    const router = useRouter()

    const [loginUserMutation, { loading }] = useLoginUserMutation({
        onCompleted: (response) => {
            setCookies(
                COOKIE_TOKEN_NAME,
                response.loginUser.token,
                {
                    expires: dayjs()
                        .add(2, 'months')
                        .toDate(),
                }
            )

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
            style={{
                backgroundColor: theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
                height: '100%',
            }}
        >
            <Paper
                p="xl"
                shadow="sm"
            >
                <Stack>
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
                        onClick={handleSubmit(onSubmit)}
                    >
                        Login
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    )
}
