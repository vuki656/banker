export type IconPickerProps = {
    color?: string
    error: string
    onChange(iconName: string): void
    required?: boolean
    value: string
}
