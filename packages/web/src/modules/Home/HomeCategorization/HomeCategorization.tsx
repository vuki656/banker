import { Box } from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { useHomeStore } from '../hooks'

import { HomeCategorizationButtons } from './HomeCategorizationButtons'
import { HomeCategorizationDetails } from './HomeCategorizationDetails'
import { HomeCategorizationEmptyMessage } from './HomeCategorizationEmptyMessage'
import { HomeCategorizationSelect } from './HomeCategorizationSelect'

export const HomeCategorization = observer(() => {
    const store = useHomeStore()

    return (
        <Box
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                padding: '20px',
                rowGap: '10px',
            }}
        >
            {store.currentTransaction ? (
                <Box
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        rowGap: '10px',
                    }}
                >
                    <HomeCategorizationDetails />
                    <HomeCategorizationSelect />
                    <HomeCategorizationButtons />
                </Box>
            ) : <HomeCategorizationEmptyMessage />}
        </Box>
    )
})
