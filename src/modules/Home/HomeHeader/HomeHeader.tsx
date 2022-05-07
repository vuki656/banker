import {
    Header,
    Text,
} from '@mantine/core'

import { HomeFileUpload } from '../HomeFileUpload'

export const HomeHeader: React.FunctionComponent = () => {
    return (
        <Header
            height={60}
            p="xs"
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 30px',
            }}
        >
            <Text style={{ fontWeight: '500' }}>
                Home
            </Text>
            <HomeFileUpload />
        </Header>
    )
}
