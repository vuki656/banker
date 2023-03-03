import type { ColorScheme } from '@mantine/core'
import {
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core'
import { setCookies } from 'cookies-next'
import { useState } from 'react'

import { COOKIE_COLORSCHEME_NAME } from '../../shared/constants'

import type { ThemeRootProps } from './ThemeRoot.types'

export const ThemeRoot: React.FunctionComponent<ThemeRootProps> = (props) => {
    const {
        children,
        colorScheme,
    } = props

    const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>(colorScheme)

    const toggleColorScheme = (newColorScheme?: ColorScheme) => {
        let nextColorScheme = newColorScheme

        if (!nextColorScheme) {
            nextColorScheme = currentColorScheme === 'dark' ? 'light' : 'dark'
        }

        setCurrentColorScheme(nextColorScheme)

        setCookies(COOKIE_COLORSCHEME_NAME, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
    }

    return (
        <ColorSchemeProvider
            colorScheme={currentColorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{
                    colorScheme: currentColorScheme,
                    components: {
                        Modal: {
                            defaultProps: {
                                overlayProps: {
                                    blur: 3,
                                    opacity: 0.55,
                                },
                            },
                        },
                    },
                    fontFamily: 'montserrat',
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
