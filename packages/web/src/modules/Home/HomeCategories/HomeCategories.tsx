import {
    Group,
    Paper,
    Text,
    ThemeIcon,
} from '@mantine/core'
import type { FunctionComponent } from 'react'

import { Icons } from '../../../components'
import { useCurrentUser } from '../../../shared/auth'
import { formatCurrency } from '../../../shared/utils'
import { useHomeStore } from '../hooks'

export const HomeCategories: FunctionComponent = () => {
    const { user } = useCurrentUser()

    const store = useHomeStore()

    return (
        <Paper
            shadow="xs"
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                gridArea: 'categories',
                overflow: 'auto',
                padding: theme.spacing.md,
                rowGap: theme.spacing.md,
            })}
        >
            <Text weight="bold">
                Categories
            </Text>
            {store.categoriesTotal.map(([name, category]) => {
                return (
                    <Group
                        key={name}
                        spacing={20}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 0.2fr 0.8fr',
                        }}
                    >
                        <ThemeIcon
                            color={category.color}
                            size={40}
                            variant="light"
                        >
                            <Icons name={category.icon} />
                        </ThemeIcon>
                        <Text weight={500}>
                            {name}
                        </Text>
                        <Text
                            size={16}
                        >
                            {formatCurrency(category.total, { currency: user?.currency })}
                        </Text>
                    </Group>
                )
            })}
        </Paper>
    )
}
