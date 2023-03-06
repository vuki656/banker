import type { TablerIconsProps } from '@tabler/icons-react'
import type { ReactElement } from 'react'

export type IconsProps = TablerIconsProps & {
    fallback?: ReactElement
    name?: string
}
