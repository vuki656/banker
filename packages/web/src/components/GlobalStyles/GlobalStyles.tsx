import { Global } from '@mantine/core'

export const GlobalStyles = () => {
    return (
        <Global
            styles={(theme) => ({
                '#__next': {
                    height: '100%',
                    width: '100%',
                },
                '*::-webkit-scrollbar': {
                    height: '7px',
                    width: '7px',
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.colors.blue[7],
                    border: '3px solid transparent',
                    borderRadius: '9px',
                },
                '*::-webkit-scrollbar-track': {
                    background: theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.white,
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
            })}
        />
    )
}
