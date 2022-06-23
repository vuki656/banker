import { Global } from '@mantine/core'

export const GlobalStyles: React.FunctionComponent = () => {
    return (
        <Global
            styles={{
                '#__next': {
                    height: '100%',
                    width: '100%',
                },
                a: {
                    textDecoration: 'none',
                },
                body: {
                    margin: '0px',
                },
                html: {
                    fontSize: '16px',
                },
                'html, body': {
                    height: '100%',
                },
            }}
        />
    )
}
