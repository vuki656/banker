import {
    Badge,
    Group,
    Stack,
    Text,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Header } from '../../components'

import { useImportStore } from './hooks'
import { ImportFileUpload } from './ImportFileUpload'
import { ImportSort } from './ImportSort'

export const Import = observer(() => {
    const store = useImportStore()

    return (
        <Stack
            spacing={0}
            style={{ height: '100%' }}
        >
            <Header
                action={<ImportFileUpload />}
                title={(
                    <Group>
                        <Text>
                            Import
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
            <ImportSort />
        </Stack>
    )
})
