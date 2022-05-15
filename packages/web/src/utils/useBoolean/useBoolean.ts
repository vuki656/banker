import { useState } from 'react'

import type { UseBooleanValue } from './useBoolean.types'

export const useBoolean = (initialValue?: boolean): UseBooleanValue => {
    const [value, setValue] = useState(initialValue ?? false)

    const setTrue = () => {
        setValue(true)
    }

    const setFalse = () => {
        setValue(false)
    }

    const toggle = () => {
        setValue((previousValue) => {
            return !previousValue
        })
    }

    return [value, {
        setFalse,
        setTrue,
        toggle,
    }]
}
