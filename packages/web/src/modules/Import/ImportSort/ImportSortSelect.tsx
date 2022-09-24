import {
    Group,
    Paper,
    Text,
    ThemeIcon,
    useMantineTheme,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import type { CategoryType } from '../../../graphql/types.generated'
import { useImportStore } from '../hooks'

export const ImportSortSelect = observer(() => {
    const store = useImportStore()

    const theme = useMantineTheme()

    const onCategoryClick = (category: CategoryType) => {
        return () => {
            store.updateCurrentTransactionCategory(category)
        }
    }

    return (
        <Group
            align="center"
            position="center"
            sx={{
                padding: theme.spacing.md,
                width: '80%',
            }}
        >
            {store.categories.map((category) => {
                const isSelected = store.currentTransaction?.category?.id === category.id
                const blue = theme.colors.blue[4]

                return (
                    <Paper
                        key={category.id}
                        onClick={onCategoryClick(category)}
                        shadow="xs"
                        sx={{
                            '&:hover': {
                                border: `1px solid ${isSelected ? blue : theme.colors.gray[4]}`,
                            },
                            border: `1px solid ${isSelected ? blue : theme.white}`,
                            cursor: 'pointer',
                            padding: '5px 10px',
                            userSelect: 'none',
                        }}
                    >
                        <Group
                            align="center"
                            spacing="sm"
                        >
                            <ThemeIcon
                                color={category.color}
                                size="md"
                                variant="light"
                            >
                                <Icons
                                    name={category.icon}
                                    size={13}
                                />
                            </ThemeIcon>
                            <Text size="sm">
                                {category.name}
                            </Text>
                        </Group>
                    </Paper>
                )
            })}
        </Group>
    )
})
