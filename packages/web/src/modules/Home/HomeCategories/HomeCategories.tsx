import {
    Group,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { IconListDetails } from '@tabler/icons'
import type { FunctionComponent } from 'react'

import {
    Icons,
    Panel,
} from '../../../components'
import { useCurrentUser } from '../../../shared/auth'
import { formatCurrency } from '../../../shared/utils'
import { useHomeStore } from '../hooks'

export const HomeCategories: FunctionComponent = () => {
    const { user } = useCurrentUser()

    const store = useHomeStore()

    return (
        <Panel
            isEmpty={store.categoriesTotal.length === 0}
            placeholder={{
                color: 'red',
                icon: <IconListDetails />,
                text: 'No categories',
            }}
            sx={{ gridArea: 'categories' }}
            title="Categories"
        >
            <Stack spacing={20}>
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
            </Stack>
        </Panel>
    )
}
