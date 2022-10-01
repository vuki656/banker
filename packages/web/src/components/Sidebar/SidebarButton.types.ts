import type { ButtonProps } from '@mantine/core'
import type { ReactElement } from 'react'

export type SidebarButtonProps = ButtonProps & {
    color: string
    icon: ReactElement
    label: string
    selected?: boolean
}
