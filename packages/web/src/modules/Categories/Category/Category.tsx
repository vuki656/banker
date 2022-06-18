import {
    Badge,
    Group,
    Stack,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core'

import { Icons } from '../../../components'

import type { CategoryProps } from './Category.types'

export const Category: React.FunctionComponent<CategoryProps> = (props) => {
    const {
        onClick,
        value,
    } = props

    return (
        <UnstyledButton
            onClick={onClick}
            sx={(theme) => ({
                '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                },
                borderRadius: theme.radius.sm,
                boxShadow: theme.shadows.xs,
            })}
        >
            <Group p="sm">
                <ThemeIcon
                    color={value.color}
                    size="xl"
                    variant="light"
                >
                    <Icons
                        name={value.icon}
                        size={21}
                    />
                </ThemeIcon>
                <Stack spacing={3}>
                    <Text
                        size="sm"
                        weight={500}
                    >
                        {value.name}
                    </Text>
                    <Group spacing="xs">
                        {value.keywords.map((keyword) => {
                            return (
                                <Badge
                                    color="gray"
                                    key={keyword.id}
                                    size="xs"
                                >
                                    {keyword.name}
                                </Badge>
                            )
                        })}
                    </Group>
                </Stack>
            </Group>
        </UnstyledButton>
    )
}
