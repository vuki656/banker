import type { TablerIconProps } from '@tabler/icons'
import type { ReactElement } from 'react'

export type IconsProps = TablerIconProps & {
    fallback?: ReactElement
    name?: string
}
