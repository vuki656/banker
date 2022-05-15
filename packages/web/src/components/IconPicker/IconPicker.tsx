import {
    Box,
    Button,
    Popover,
    Text,
    ThemeIcon,
} from '@mantine/core'
import * as IconList from '@tabler/icons'
import { useMemo } from 'react'

import { useBoolean } from '../../utils'

import type { IconPickerProps } from './IconPicker.types'

const ICON_LIST = new Set([
    'IconPizza',
    'IconShoppingCart',
    'IconCar',
    'IconHome',
    'IconRotateClockwise',
])

const ALL_ICONS = Object
    .values(IconList)
    .filter((Icon) => {
        return ICON_LIST.has(Icon.name)
    })

export const IconPicker: React.FunctionComponent<IconPickerProps> = (props) => {
    const {
        color,
        error,
        onChange,
        value,
    } = props

    const [isOpen, openActions] = useBoolean()

    const SelectedIcon = useMemo(() => {
        return Object
            .values(IconList)
            .find((Icon) => {
                return Icon.name === value
            })
    }, [value])

    const onIconSelect = (iconName: string) => {
        return () => {
            onChange(iconName)

            openActions.setFalse()
        }
    }

    return (
        <Popover
            closeOnClickOutside={true}
            onClose={openActions.setFalse}
            opened={isOpen}
            position="bottom"
            styles={{
                inner: {
                    display: 'flex',
                    gap: '10px',
                    maxHeight: '200px',
                    overflow: 'hidden',
                },
            }}
            target={(
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '10px',
                    }}
                >
                    <Text>
                        Icon
                    </Text>
                    <Box
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            rowGap: '10px',
                        }}
                    >
                        {SelectedIcon ? (
                            <ThemeIcon
                                color={color}
                                size="lg"
                                variant="light"
                            >
                                <SelectedIcon size={18} />
                            </ThemeIcon>
                        ) : (
                            <Text
                                color="dimmed"
                                style={{ fontSize: '13px' }}
                            >
                                No Icon Selected
                            </Text>
                        )}
                        <Button
                            onClick={openActions.toggle}
                            variant="default"
                        >
                            Select
                        </Button>
                    </Box>
                    {error ? (
                        <Text
                            style={{
                                color: 'red',
                                fontSize: '14px',
                            }}
                        >
                            {error}
                        </Text>
                    ) : null}
                </Box>
            )}
            width={260}
            withArrow={false}
        >
            {ALL_ICONS.map((Icon) => {
                return (
                    <ThemeIcon
                        color={color}
                        key={Icon.name}
                        onClick={onIconSelect(Icon.name)}
                        size="lg"
                        variant="light"
                    >
                        <Icon size={20} />
                    </ThemeIcon>
                )
            })}
        </Popover>
    )
}
