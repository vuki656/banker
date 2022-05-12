import { Box } from '@mantine/core'

import { Header } from '../../components'

import { HomeFileUpload } from './HomeFileUpload'

export const Home: React.FunctionComponent = () => {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
        >
            <Header
                action={<HomeFileUpload />}
                title="Home"
            />
        </Box>
    )
}
