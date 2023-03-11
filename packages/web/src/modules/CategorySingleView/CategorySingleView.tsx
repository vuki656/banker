import {
    Badge,
    Box,
    Group,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { useUpdateEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'

import {
    Header,
    Icons,
    RangeSelect,
} from '../../components'
import { useGetTransactionsLazyQuery } from '../../graphql/types.generated'
import { useCurrentUser } from '../../shared/auth'
import { formatCurrency } from '../../shared/utils'

import { CategoryChart } from './CategoryChart'
import { CategoryKeywords } from './CategoryKeywords'
import { CategoryTransactions } from './CategoryTransactions'
import { CategoryUpdateDialog } from './CategoryUpdateDialog'
import { useCategoryStore } from './hooks'

export const CategorySingleView = observer(() => {
    const { user } = useCurrentUser()

    const store = useCategoryStore()

    const [getTransactions] = useGetTransactionsLazyQuery({
        onCompleted: (data) => {
            store.setTransactions(data.transactions)
        },
    })

    useUpdateEffect(() => {
        void getTransactions({
            variables: {
                args: {
                    categoryId: store.category.id,
                    endDate: store.range.endDate.toISOString(),
                    startDate: store.range.startDate.toISOString(),
                },
            },
        })
    }, [store.startDate, store.endDate])

    return (
        <Stack
            spacing={0}
            sx={{ width: '100%' }}
        >
            <Header
                action={(
                    <RangeSelect
                        onSubmit={store.setRange}
                        range={store.range}
                        value={[store.startDate, store.endDate]}
                    />
                )}
                center={(
                    <Badge
                        color="green"
                        size="lg"
                    >
                        {formatCurrency(store.total, { currency: user?.currency })}
                    </Badge>
                )}
                title={(
                    <Group>
                        <ThemeIcon
                            color={store.category.color}
                            size="lg"
                            variant="light"
                        >
                            <Icons
                                name={store.category.icon}
                                size={20}
                            />
                        </ThemeIcon>
                        <Text>
                            {store.category.name}
                        </Text>
                        <CategoryUpdateDialog />
                    </Group>
                )}
            />
            <Box
                p="xl"
                sx={(theme) => ({
                    display: 'grid',
                    gap: theme.spacing.xl,
                    gridTemplateAreas: `
                        "transactions chart"
                        "transactions keywords"
                    `,
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    height: '100%',
                    overflow: 'hidden',
                    width: '100%',
                })}
            >
                <CategoryTransactions />
                <CategoryChart />
                <CategoryKeywords />
            </Box>
        </Stack>
    )
})
