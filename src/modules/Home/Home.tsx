import { Box } from '@mantine/core'

import { HomeHeader } from './HomeHeader'

export const Home: React.FunctionComponent = () => {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
        >
            <HomeHeader />
        </Box>
    )
}
