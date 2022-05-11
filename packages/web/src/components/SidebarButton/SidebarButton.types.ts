import type { UnstyledButtonProps } from '@mantine/core'

export type SidebarButtonProps = UnstyledButtonProps<'button'> & {
    color: string
    icon: React.ReactNode
    label: string
}
