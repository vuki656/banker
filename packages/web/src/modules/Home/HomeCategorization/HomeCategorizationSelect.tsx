import {
    Box,
    Chip,
    Text,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Icons } from '../../../components'
import { useHomeStore } from '../hooks'

export const HomeCategorizationSelect = observer(() => {
    const store = useHomeStore()

    return (
        <Box
            style={{
                columnGap: '30px',
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '20px',
                rowGap: '20px',
            }}
        >
            {store.categories.map((category) => {
                return (
                    <Box
                        checked={store.currentTransaction?.category?.id === category.id}
                        component={Chip}
                        key={category.id}
                        onClick={() => {
                            store.updateCurrentTransactionCategory(category)
                        }}
                        style={{
                            alignItems: 'center',
                            columnGap: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        styles={{
                            checkIcon: {
                                color: 'black',
                            },
                            iconWrapper: {
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                width: '12px',
                            },
                            label: {
                                columnGap: '10px',
                                display: 'flex',
                                height: '30px',
                            },
                            root: {
                                alignItems: 'center',
                                display: 'flex',
                            },
                        }}
                        value={category.id}
                    >
                        <Icons
                            color={category.color}
                            name={category.icon}
                            size={21}
                        />
                        <Text
                            size="sm"
                            weight={500}
                        >
                            {category.name}
                        </Text>
                    </Box>
                )
            })}
        </Box>
    )
})
