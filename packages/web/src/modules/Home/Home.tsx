import {
    Badge,
    Group,
    Stack,
    Text,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Header } from '../../components'

import { HomeFileUpload } from './HomeFileUpload'
import { HomeSort } from './HomeSort'
import { useHomeStore } from './hooks'

export const Home = observer(() => {
    const store = useHomeStore()

    return (
        <Stack
            spacing={0}
            style={{ height: '100%' }}
        >
            <Header
                action={<HomeFileUpload />}
                title={(
                    <Group>
                        <Text>
                            Home
                        </Text>
                        {store.progress
                            ? (
                                <Badge>
                                    {store.progress}
                                </Badge>
                            )
                            : null}
                    </Group>
                )}
            />
            <HomeSort />
        </Stack>
    )
})
