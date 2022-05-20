import {
    Button,
    Group,
    InputWrapper,
    Popover,
    Text,
    ThemeIcon,
} from '@mantine/core'

import { useBoolean } from '../../utils'
import {
    Icons,
    ICONS,
} from '../Icons'

import type { IconPickerProps } from './IconPicker.types'

export const IconPicker: React.FunctionComponent<IconPickerProps> = (props) => {
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
        <InputWrapper
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
                    target={(
                        <Button
                            onClick={openActions.toggle}
                            variant="default"
                        >
                            Select
                        </Button>
                    )}
                    width={260}
                    withArrow={true}
                >
                    <Group align="center">
                        {ICONS.map((Icon) => {
                            return (
                                <ThemeIcon
                                    color={color}
                                    key={Icon.name}
                                    onClick={onIconSelect(Icon.name)}
                                    size="lg"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    sx={(theme) => ({
                                        '&:hover': {
                                            border: `1px solid ${theme.colors.gray[3]}`,
                                        },
                                    })}
                                    variant="light"
                                >
                                    <Icon size={20} />
                                </ThemeIcon>
                            )
                        })}
                    </Group>
                </Popover>
            </Group>
        </InputWrapper>
    )
}
