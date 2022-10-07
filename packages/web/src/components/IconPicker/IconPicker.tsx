import {
    Button,
    Group,
    Input,
    Popover,
    Text,
    ThemeIcon,
} from '@mantine/core'
import { cloneElement } from 'react'

import { useBoolean } from '../../shared/hooks'
import {
    ICON_LIST,
    Icons,
} from '../Icons'

import type { IconPickerProps } from './IconPicker.types'

export const IconPicker = (props: IconPickerProps) => {
    const {
        color,
        error,
        onChange,
        required,
        value,
    } = props

    const [isOpen, openActions] = useBoolean()

    const onIconSelect = (iconName: string) => {
        return () => {
            onChange(iconName)

            openActions.setFalse()
        }
    }

    return (
        <Input.Wrapper
            error={error}
            label="Icon"
            required={required}
        >
            <Group position="apart">
                <Icons
                    color={color}
                    fallback={(
                        <Text
                            color="dimmed"
                            size="xs"
                        >
                            No Icon Selected
                        </Text>
                    )}
                    name={value}
                />
                <Popover
                    closeOnClickOutside={true}
                    onClose={openActions.setFalse}
                    opened={isOpen}
                    position="bottom"
                    width={260}
                    withArrow={true}
                >
                    <Popover.Target>
                        <Button
                            onClick={openActions.toggle}
                            variant="default"
                        >
                            Select
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Group align="center">
                            {ICON_LIST.map((Icon) => {
                                return (
                                    <ThemeIcon
                                        color={color}
                                        key={Icon.key}
                                        onClick={onIconSelect(String(Icon.key))}
                                        size="lg"
                                        sx={(theme) => ({
                                            '&:hover': {
                                                border: `1px solid ${theme.colors.gray[3]}`,
                                            },
                                            backgroundColor: theme.white,
                                            cursor: 'pointer',
                                        })}
                                        variant="light"
                                    >
                                        {cloneElement(Icon, { size: 20 })}
                                    </ThemeIcon>
                                )
                            })}
                        </Group>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Input.Wrapper>
    )
}
