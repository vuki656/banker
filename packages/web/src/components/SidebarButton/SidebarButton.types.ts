import type { UnstyledButtonProps } from '@mantine/core'
import type { ReactElement } from 'react'

export type SidebarButtonProps = UnstyledButtonProps<'button'> & {
    color: string
    icon: ReactElement
    label: string
    selected?: boolean
}
