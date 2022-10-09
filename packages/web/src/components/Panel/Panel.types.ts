import type {
    MantineColor,
    PaperProps,
} from '@mantine/core'
import type {
    ReactElement,
    ReactNode,
} from 'react'

export type PanelProps = PaperProps & {
    children: ReactNode
    isEmpty?: boolean
    placeholder?: {
        color: MantineColor
        icon: ReactElement
        text: string
    }
    title: string
}
