import {
    Badge,
    Group,
    LoadingOverlay,
    Stack,
    Text,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { Header } from '../../components'
import { useImportPageDataQuery } from '../../graphql/types.generated'

import { useImportStore } from './hooks'
import { ImportFileUpload } from './ImportFileUpload'
import { ImportSort } from './ImportSort'

export const Import = observer(() => {
    const store = useImportStore()

    const { loading } = useImportPageDataQuery({
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            store.setCategories(data.categories)
            store.setExistingTransactions(data.transactions)
        },
        ssr: false,
    })

    return (
        <Stack
            spacing={0}
            sx={{
                flex: 1,
                position: 'relative'
            }}
        >
            <LoadingOverlay visible={loading} />
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
